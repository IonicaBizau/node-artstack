var Cheerio = require("cheerio")
  , Request = require("request")
  , Config = require("../conf")
  ;

var Util = module.exports = {};

Util.AS_HOST = "https://theartstack.com";
Util.isDebug = Boolean(process.env.ARTSTACK_DEBUG);

Util.request = function (url, callback) {
    Request.get({
        url: Util.AS_HOST + url
      , headers: {
            "Cookie": Config.credentials.cookie
        }
    }, function (err, res, body) {
        if (err) { return callback(err); }
        callback(null, Cheerio.load(body));
    });
};
