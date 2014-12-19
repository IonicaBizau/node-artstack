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
    Config.credentials = loginData;
    Request.post({
        url: Util.AS_HOST + "/sessions"
      , form: QueryString.stringify({
            "user_session[email]": loginData.email
          , "user_session[password]": loginData.password
        })
    }, function (err, res, body) {
        if (err) { return callback(err); }
        var cookies = res.headers["set-cookie"];
        Config.credentials.cookie = cookies;
        callback(null, cookies);
    });
};
