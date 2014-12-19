var Cheerio = require("cheerio")
var Util = module.exports = {};

Util.AS_HOST = "https://theartstack.com";
Util.isDebug = Boolean(process.env.ARTSTACK_DEBUG);

Util.request = function (url, callback) {
    var self = this;
    Request.get({
        url: Util.AS_HOST + url
      , headers: {
            "Cookie": self.auth.cookie
        }
    }, function (err, res, body) {
        if (err) { return callback(err); }
        callback(null, Cheerio.load(body));
    });
};
