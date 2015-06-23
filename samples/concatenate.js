var path = require("path")
var concat = require("sound-conjunct").concatenate;

var fnames = ["explosion-01.wav",
              "Media-Convert_test1_Alaw_Mono_VBR_8SS_16000Hz.wav",
              "Media-Convert_test2_PCM_Mono_VBR_8SS_48000Hz.wav",
              "Media-Convert_test3_PCM_Stereo_VBR_16SS_11025Hz.wav",
              "Media-Convert_test4_Ulaw_Mono_VBR_8SS_22050Hz.wav"];

for (var e in fnames) {
    fnames[e] = path.resolve(__dirname, "sound/" + fnames[0]);
}

concat(fnames, path.resolve(__dirname, "out.wav"));