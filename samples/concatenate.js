var path = require("path")
var concat = require("../index").concatenate;

var fnames = ["explosion-01.wav",
              "Media-Convert_test1_Alaw_Mono_VBR_8SS_16000Hz.wav",
              "Media-Convert_test2_PCM_Mono_VBR_8SS_48000Hz.wav",
              "Media-Convert_test3_PCM_Stereo_VBR_16SS_11025Hz.wav",
              "Media-Convert_test4_Ulaw_Mono_VBR_8SS_22050Hz.wav"];

for (var e in fnames) {
    fnames[e] = path.resolve(__dirname, "sounds", fnames[1]);
}

//    var opts = {
//        bits: assign.bits || 8,
//        rate: assign.rate || 16000,
//        channels: assign.channels || 1
//    };

var opts = {
    bits: 16,
    rate: 24000
};

concat(fnames, path.resolve(__dirname, "out.wav"), opts)
    .then(function (res) {
        console.log("RES:", res)
    })
    .catch(function (res) {
        console.log("ERR:", res)
    });