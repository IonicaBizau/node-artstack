// Dependencies
var Request = require("request")
  , Cheerio = require("cheerio")
  , QueryString = require("querystring")
  , Util = require("../util")
  , Config = require("../conf")
  ;

// Auth
var Auth = module.exports = {};

/**
 * ArtStack.auth
 * Authenticates the user.
 *
 * @name ArtStack.auth
 * @function
 * @param {Object} loginData An object containing the following fields:
 *
 *  - `username` (String): The username.
 *  - `password` (String): The password.
 *  - `email` (String): The email address.
 *
 * @param {Function} callback The callback function.
 * @return {undefined}
 */
Auth.login = function (loginData, callback) {
    var $ = null;
    if (Util.isDebug) {
        console.log("Getting the csrf-token.");
    }
    Config.credentials = loginData;
    Request.get(Util.AS_HOST + "/signin", function (err, res, body) {
        if (err) { return callback(err); }
        var token = Cheerio.load(body)("meta[name='csrf-token']").attr("content");
        if (Util.isDebug) {
            console.log("csrf-token is: " + token);
            console.log("Logging in...");
        }
        Request.post({
            url: Util.AS_HOST + "/sessions"
          , form: QueryString.stringify({
                "utf8": "✓"
              , "authenticity_token": token
              , "user_session[email]": loginData.email
              , "user_session[password]": loginData.password
              , "user_session[remember_me]": 0
              , "user_session[remember_me]": 1
              , "commit": "Log In"
            })
        }, function (err, res, body) {
            if (err) { return callback(err); }
            var cookies = res.headers["set-cookie"];
            Config.credentials.cookie = cookies;
            callback(null, cookies);
        });
    });
};
