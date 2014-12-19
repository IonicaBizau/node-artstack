// Dependencies
var ArtStack = require("../lib");

// Authenticate
ArtStack.auth(require("./auth"), function (err) {
    if (err) throw err;

    // List your following artists
    ArtStack.tags.list(function (err, artists) {
        if (err) throw err;
        console.log(artists);
    });
});
