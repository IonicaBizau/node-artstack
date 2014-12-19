// Dependencies
var Request = require("request")
  , Cheerio = require("cheerio")
  , QueryString = require("querystring")
  , Util = require("../util")
  ;

// Auth
var Auth = module.exports = {};

// TODO JsDoc
Auth.login = function (loginData, callback) {
    var $ = null;
    if (Util.isDebug) {
        console.log("Getting the csrf-token.");
    }
    Request.get(Util.AS_HOST + "/signin", function (err, res, body) {
        if (err) { return callback(err); }
        var token = Cheerio.load(body)("meta[name='csrf-token']").attr("content")
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
            callback(null, cookies);
        });
    });
};
