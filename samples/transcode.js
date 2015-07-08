var path = require("path")
var transcode = require("../index").transcode;

var fnames = ["explosion-01.wav",
              "Media-Convert_test1_Alaw_Mono_VBR_8SS_16000Hz.wav",
              "Media-Convert_test2_PCM_Mono_VBR_8SS_48000Hz.wav",
              "Media-Convert_test3_PCM_Stereo_VBR_16SS_11025Hz.wav",
              "Media-Convert_test4_Ulaw_Mono_VBR_8SS_22050Hz.wav"];

fname = path.resolve(__dirname, "sounds", fnames[2]);

var formats = ["oga", "m4a", "mp3", "ogg", "aac"];
transcode(fname, path.resolve(__dirname, "out"), formats)
    .then(function (res) {
        console.log("RES:", res)
    })
    .catch(function (res) {
        console.log("ERR:", res)
    });