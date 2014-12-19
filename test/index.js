// Dependencies
var ArtStack = require("../lib");

// Authenticate
ArtStack.auth(require("./auth"), function (err) {
    if (err) throw err;

    // List your following artists
    ArtStack.tags.list(function (err, artists) {
        if (err) throw err;
        console.log(artists);

        // Check if the user follows anyone
        if (!artists.length) {
            return console.log("You don't follow anyone.");
        }

        // Get artworks from artist
        ArtStack.artworks.fromArtist(artists[0], function (err, artworks) {
            if (err) throw err;
            console.log(artists[0].display_name + " has " + artworks.length + " artworks.");
        });
    });
});
