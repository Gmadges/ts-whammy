"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var getEBMLShell_1 = tslib_1.__importDefault(require("./getEBMLShell"));
var getEBMLCuePoint_1 = tslib_1.__importDefault(require("./getEBMLCuePoint"));
var generateEBML_1 = tslib_1.__importDefault(require("./generateEBML"));
var checkFrames_1 = tslib_1.__importDefault(require("./checkFrames"));
var makeSimpleBlock_1 = tslib_1.__importDefault(require("./makeSimpleBlock"));
function toWebM(frames, outputAsArray) {
    var info = checkFrames_1.default(frames);
    // max duration by cluster in milliseconds
    var CLUSTER_MAX_DURATION = 30000;
    var EBML = getEBMLShell_1.default(info);
    var segment = EBML[1];
    var cues = segment.data[2];
    // Generate clusters (max duration)
    var frameNumber = 0;
    var clusterTimecode = 0;
    var _loop_1 = function () {
        var cuePoint = getEBMLCuePoint_1.default(clusterTimecode);
        cues.data.push(cuePoint);
        var clusterFrames = [];
        var clusterDuration = 0;
        do {
            clusterFrames.push(frames[frameNumber]);
            clusterDuration += frames[frameNumber].duration;
            frameNumber++;
        } while (frameNumber < frames.length && clusterDuration < CLUSTER_MAX_DURATION);
        var clusterCounter = 0;
        var clusterDataList = clusterFrames.map(function (webp) {
            var block = makeSimpleBlock_1.default({
                discardable: 0,
                frame: webp.data.slice(4),
                invisible: 0,
                keyframe: 1,
                lacing: 0,
                trackNum: 1,
                timecode: Math.round(clusterCounter),
            });
            clusterCounter += webp.duration;
            return {
                data: block,
                id: 0xa3,
            };
        });
        var cluster = {
            id: 0x1f43b675,
            data: [{
                    data: Math.round(clusterTimecode),
                    id: 0xe7,
                }].concat(clusterDataList),
        };
        // Add cluster to segment
        segment.data.push(cluster);
        clusterTimecode += clusterDuration;
    };
    while (frameNumber < frames.length) {
        _loop_1();
    }
    // First pass to compute cluster positions
    var position = 0;
    for (var i = 0; i < segment.data.length; i++) {
        if (i >= 3) {
            cues.data[i - 3].data[1].data[1].data = position;
        }
        var data = generateEBML_1.default([segment.data[i]], outputAsArray);
        if (typeof Blob !== 'undefined' && data instanceof Blob) {
            position += data.size;
        }
        if (data instanceof Uint8Array) {
            position += data.byteLength;
        }
        if (i !== 2) { // not cues
            // Save results to avoid having to encode everything twice
            segment.data[i] = data;
        }
    }
    return generateEBML_1.default(EBML, outputAsArray);
}
exports.default = toWebM;
