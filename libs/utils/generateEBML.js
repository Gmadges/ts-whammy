"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var base_1 = require("./base");
var toFlatArray_1 = tslib_1.__importDefault(require("./toFlatArray"));
function generateEBML(json, outputAsArray) {
    var ebml = [];
    for (var _i = 0, json_1 = json; _i < json_1.length; _i++) {
        var item = json_1[_i];
        if (!('id' in item)) {
            // already encoded blob or byteArray
            ebml.push(item);
            continue;
        }
        var data = item.data;
        if (typeof data === 'object') {
            data = generateEBML(data, outputAsArray);
        }
        if (typeof data === 'number') {
            data = ('size' in item) ? base_1.numToFixedBuffer(data, item.size || 0) : base_1.bitsToBuffer(data.toString(2));
        }
        if (typeof data === 'string') {
            data = base_1.strToBuffer(data);
        }
        // if (data.length) {
        //   const z = z
        // }
        var len = data.size || data.byteLength || data.length;
        var zeroes = Math.ceil(Math.ceil(Math.log(len) / Math.log(2)) / 8);
        var sizeStr = len.toString(2);
        var padded = (new Array((zeroes * 7 + 7 + 1) - sizeStr.length)).join('0') + sizeStr;
        var size = (new Array(zeroes)).join('0') + '1' + padded;
        // i actually dont quite understand what went on up there, so I'm not really
        // going to fix this, i'm probably just going to write some hacky thing which
        // converts that string into a buffer-esque thing
        ebml.push(base_1.numToBuffer(item.id));
        ebml.push(base_1.bitsToBuffer(size));
        ebml.push(data);
    }
    // output as blob or byteArray
    if (outputAsArray) {
        // convert ebml to an array
        var buffer = toFlatArray_1.default(ebml);
        return new Uint8Array(buffer);
    }
    else {
        return new Blob(ebml, {
            type: 'video/webm',
        });
    }
}
exports.default = generateEBML;
