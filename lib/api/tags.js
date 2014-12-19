// Dependencies
var Util = require("../util")
  , Config = require("../conf")
  ;

var Tags = module.exports = {};

Tags.fromUser = function (username, callback) {
    var artists = []
      , $artists = []
      , $cArtist = {}
      , i = 0
      , followers_count = -1
      ;

    function getSeq(page) {
        Util.request("/" + username + "/tags?page=" + page, function (err, $) {
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

// TODO JSDoc
Tags.list = function (callback) {
    Tags.fromUser(Config.credentials.username, callback);
};
