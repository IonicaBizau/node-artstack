# artstack [![Support this project][donate-now]][paypal-donations]

Unofficial ArtStack API wrapper for NodeJS.

## Installation

```sh
$ npm i -g artstack
```

## Example

```js
// Dependencies
var ArtStack = require("artstack");

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
```

## Documentation

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

 - [`artstack-downloader`](https://github.com/IonicaBizau/artstack-downloader)

## License

[KINDLY][license] © [Ionică Bizău][website]

[license]: http://ionicabizau.github.io/kindly-license/?author=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica@gmail.com%3E&year=2014

[website]: http://ionicabizau.net
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md