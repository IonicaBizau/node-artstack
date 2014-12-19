// Dependencies
var Cheerio = require("cheerio")
  , Request = require("request")
  , Util = require("../util")
  ;

var Tags = module.exports = {};

// TODO JSDoc
Tags.all = function (callback) {

    var self = this
      , artists = []
      , $ = null
      , $artists = []
      , $cArtist = {}
      , i = 0
      , followers_count = -1
      ;

    function getSeq(page) {
        self._request(self.auth.username + "/tags?page=" + page, function (err, $) {
            if (err) { return callback(err); }
            $artists = $(".users-list-item");
            if (!$artists.length) {
                return callback(null, artists);
            }

            for (i = 0; i < $artists.length; ++i) {
                $cArtist = $artists.eq(i);
                followers_count = parseInt($(".display-name > .followers", $cArtist).text().replace(/\,/g, "").match(/^\(([0-9]+) followers\)/)[1])
                artists.push({
                    profile_url: $("a", $cArtist).attr("href")
                  , display_name:  $(".display-name > [dir]", $cArtist).text()
                  , followers_count: followers_count
                });
            }

            getSeq(page + 1);
        });
    }

    getSeq(1);
};
