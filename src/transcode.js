'use strict'

var Promise = require("bluebird");
var ffmpeg = require('fluent-ffmpeg');

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
            var cmd = ffmpeg(fname);
            if (params.rate) cmd.audioBitrate(params.rate);
            if (params.codec) cmd.audioCodec(params.codec);
            if (params.channels) cmd.audioChannels(params.channels);
            if (params.bitrate) cmd.audioBitrate(params.bitrate);
            cmd
            //                .format(ext)
                .on('end', function () {
                    resolve(true);
                })
                .on('error', function (err) {
                    console.log('SOUND_CONJUNCT: Conversion error: ' + err.message);
                    resolve(false);
                })
                .save(ofname);
        });
    }
    return Promise.props(promises);
}