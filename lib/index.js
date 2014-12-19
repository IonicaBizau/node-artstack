// Constructor
var ArtStack = module.exports = {};

// Require APIs
ArtStack.auth = require("./auth").login;
ArtStack.tags = require("./api/tags");
ArtStack.artworks = require("./api/artworks");
