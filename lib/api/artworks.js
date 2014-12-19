// Dependencies
var Config = require("../conf");

var Artworks = module.exports = {};

// TODO JSDoc
Artworks.fromArtist = function (user, callback) {

    var $ = null
      , $artworks = []
      , $cArtwork = null
      , artworks = []
      , i = 0
      ;

    function getSeq(page) {
        Request.get({
            url: "https://theartstack.com" + user.profile_url + "?page=" + page
          , headers: {
                "Cookie": Config.cookie
            }
        }, function (err, res, body) {
            if (err) { return callback(err); }
            $ = Cheerio.load(body);
            $artworks = $(".work-title [data-highres-pic]");
            if (!$artworks.length) {
                return callback(null, artworks);
            }
            for (i = 0; i < $artworks.length; ++i) {
                $cArtwork = $artworks.eq(i);
                artworks.push({
                    url: $cArtwork.attr("data-highres-pic")
                });
            }
            getSeq(page + 1);
        });
    }

    getSeq(1);
};
