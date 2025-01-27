"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function numToBuffer(num) {
    var parts = [];
    while (num > 0) {
        parts.push(num & 0xff);
        num = num >> 8;
    }
    return new Uint8Array(parts.reverse());
}
exports.numToBuffer = numToBuffer;
function numToFixedBuffer(num, size) {
    var parts = new Uint8Array(size);
    for (var i = size - 1; i >= 0; i--) {
        parts[i] = num & 0xff;
        num = num >> 8;
    }
    return parts;
}
exports.numToFixedBuffer = numToFixedBuffer;
function strToBuffer(str) {
    var arr = new Uint8Array(str.length);
    for (var i = 0; i < str.length; i++) {
        arr[i] = str.charCodeAt(i);
    }
    return arr;
}
exports.strToBuffer = strToBuffer;
function bitsToBuffer(bits) {
    var data = [];
    var pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : '';
    var curBits = pad + bits;
    for (var i = 0; i < curBits.length; i += 8) {
        data.push(parseInt(curBits.substr(i, 8), 2));
    }
    return new Uint8Array(data);
}
exports.bitsToBuffer = bitsToBuffer;
function toBinStr_old(bits) {
    var data = '';
    var pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : '';
    var curBits = pad + bits;
    for (var i = 0; i < curBits.length; i += 8) {
        data += String.fromCharCode(parseInt(curBits.substr(i, 8), 2));
    }
    return data;
}
exports.toBinStr_old = toBinStr_old;
function doubleToString(num) {
    return [].slice.call(new Uint8Array(new Float64Array([num]).buffer), 0)
        .map(function (e) { return String.fromCharCode(e); })
        .reverse()
        .join('');
}
exports.doubleToString = doubleToString;
