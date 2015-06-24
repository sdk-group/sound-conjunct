'use strict'

var Promise = require("bluebird");
var sox = Promise.promisify(require('sox.js'));

module.exports = function (fnames, outfile, params) {
    var files = fnames || [];
    var assign = params || {};
    var opts = {
        bits: assign.bits || 8,
        rate: assign.rate || 16000,
        channels: assign.channels || 1
    };
    return sox([files, opts, outfile], ['rate', '-ql'])
        .then(function (out) {
            return out;
        })
        .catch(function (err) {
            return err.isOperational ? outfile : err;
        });
}