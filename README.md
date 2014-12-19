Artstack
========
Unofficial ArtStack API wrapper for NodeJS.

# Installation

```sh
$ npm install artstack
```

# Example

```js
// Dependencies
var ArtStack = require("artstack");

// Authenticate
ArtStack.auth({
    username: "yourusername"
  , email: "you@domain.com"
  , password: "yourpassword"
}, function (err) {
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
```

# Documentation
## `ArtStack.auth(loginData, callback)`
Authenticates the user.

### Params
- **Object** `loginData`: An object containing the following fields:
 - `username` (String): The username.
 - `password` (String): The password.
 - `email` (String): The email address.

- **Function** `callback`: The callback function.

## `ArtStack.artworks.fromArtist(user, callback)`
Fetches artworks from provided artist.

### Params
- **User** `user`: The user object (must contain the `profile_url` field).
- **Function** `callback`: The callback function.

## `ArtStack.tags.fromUser(username, callback)`
Fetches the tags from provided user.

### Params
- **String** `username`: The user's username where you want to fetch the tags from.
- **Function** `callback`: The callback function.

## `ArtStack.tags.list(callback)`
Fetches the authenticated user's tags.

### Params
- **Function** `callback`: The callback function.

# How to contribute
1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

# License
See the [LICENSE](./LICENSE) file.
