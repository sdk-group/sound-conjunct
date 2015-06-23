'use strict'

var sox = require('sox.js');

module.exports = function (fnames, outfile) {
    var opts = {
        rate: 8000,
        channels: 1
    };
    sox([fnames, opts, outfile], ['rate', '-ql'],
        function done(err, out) {
            console.log(err) // => null
            console.log(out) // => song.flac
        });
}