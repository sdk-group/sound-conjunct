'use strict'

var Promise = require("bluebird");
var sox = require('sox-audio');
var path = require("path");

module.exports = function (fnames, outfile, params) {
    var files = fnames || [];
    var assign = params || {};
    var opts = {
        bits: assign.bits || 8,
        rate: assign.rate || 16000,
        channels: assign.channels || 1,
        pad: (assign.voice_pause / 1000) || 0
    };

    return new Promise(function (resolve, reject) {
        var cmd = sox();
        for (var i in files) {
            var sub = sox()
                .input(files[i])
                .output('-p')
                .outputFileType('wav')
                .addEffect("pad", [0, opts.pad]);
            cmd.inputSubCommand(sub);
        }
        cmd
            .output(outfile)
            .outputFileType('wav')
            .outputBits(opts.bits)
            .outputChannels(opts.channels)
            .outputSampleRate(opts.rate)
            .concat();
        cmd
            .on('error', function (err, stdout, stderr) {
                console.log('Cannot process audio: ' + err.message);
                console.log('Sox Command Stdout: ', stdout);
                console.log('Sox Command Stderr: ', stderr);
                return resolve(false);
            })
            .on('end', function () {
                console.log('Sox command succeeded!');
                return resolve(outfile);
            });
        cmd.on('start', function (commandLine) {
            console.log('Spawned sox with command ' + commandLine);
        });

        cmd.on('progress', function (progress) {
            console.log('Processing progress: ', progress);
        });
        cmd.run();
    });
}