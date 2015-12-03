# artstack [![Support this project][donate-now]][paypal-donations]

Unofficial ArtStack API wrapper for NodeJS.

## Installation

```sh
$ npm i --save artstack
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

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2014#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md