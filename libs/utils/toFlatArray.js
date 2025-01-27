"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toFlatArray(arr, outBuffer) {
    if (!outBuffer) {
        outBuffer = [];
    }
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var item = arr_1[_i];
        if (typeof item === 'object' && item[Symbol.iterator]) {
            toFlatArray(item, outBuffer);
        }
        else {
            outBuffer.push(item);
        }
    }
    return outBuffer;
}
exports.default = toFlatArray;
