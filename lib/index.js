var ArtStack = module.exports = function () {
    var self = this;
    ArtStack.auth = require("./auth").login;
    ArtStack.tags = require("./api/tags");
    ArtStack.artworks = require("./api/artworks");
};
