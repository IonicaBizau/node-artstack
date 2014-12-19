var ArtStack = module.exports = {};

ArtStack.auth = require("./auth").login;
ArtStack.tags = require("./api/tags");
ArtStack.artworks = require("./api/artworks");
