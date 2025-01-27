"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
function generateEBML_old(json) {
    var ebml = '';
    for (var _i = 0, json_1 = json; _i < json_1.length; _i++) {
        var item = json_1[_i];
        var data = item.data;
        if (typeof data === 'object') {
            data = generateEBML_old(data);
        }
        if (typeof data === 'number') {
            data = base_1.toBinStr_old(data.toString(2));
        }
        var len = data.length;
        var zeroes = Math.ceil(Math.ceil(Math.log(len) / Math.log(2)) / 8);
        var sizeStr = len.toString(2);
        var padded = (new Array((zeroes * 7 + 7 + 1) - sizeStr.length)).join('0') + sizeStr;
        var size = (new Array(zeroes)).join('0') + '1' + padded;
        ebml += base_1.toBinStr_old(item.id.toString(2)) + base_1.toBinStr_old(size) + data;
    }
    return ebml;
}
exports.generateEBML_old = generateEBML_old;
