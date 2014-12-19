// Dependencies
var Config = require("../conf")
  , Util = require("../util")
  ;

// Constructor
var Artworks = module.exports = {};

/**
 * ArtStack.artworks.fromArtist
 * Fetches artworks from provided artist.
 *
 * @name ArtStack.artworks.fromArtist
 * @function
 * @param {User} user The user object (must contain the `profile_url` field).
 * @param {Function} callback The callback function.
 * @return {undefined}
 */
Artworks.fromArtist = function (user, callback) {

    var $ = null
      , $artworks = []
      , $cArtwork = null
      , artworks = []
      , i = 0
      ;

    function getSeq(page) {
        Util.request(user.profile_url + "?page=" + page, function (err, $) {
            if (err) { return callback(err); }
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
