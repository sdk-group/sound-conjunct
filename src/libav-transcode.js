'use strict'

var Promise = require("bluebird");
var avconv = require('avconv');

module.exports = function (fname, outfile, exts, opts) {
    var promises = {};
    var outs = {};
    var formats = exts || [];
    var params = opts || {};

    for (var i in formats) {
        var ext = formats[i];
        var ofname = outfile + "." + ext;

        promises[ext] = new Promise(function (resolve, reject) {
            outs[ext] = ofname;
            var avopts = ["-i", fname];
            if (params.rate) avopts.push("-ar", params.rate);
            if (params.codec) avopts.push("-acodec", params.codec);
            if (params.channels) avopts.push("-ac", params.channels);
            if (params.bitrate) avopts.push("-b", params.bitrate);
            avopts.push("-y", ofname);
            console.log(avopts)
            cmd.once('exit', function (code, signal, data) {
                resolve(!code);
            });
            cmd.once('error', function (err) {
                console.log('SOUND_CONJUNCT: AVConversion error: ' + err.message);
                resolve(false);
            });
        });
    }
    return Promise.props(promises);
}