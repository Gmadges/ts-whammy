"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function autoAtob(str) {
    if (typeof atob !== 'undefined') {
        return atob(str);
    }
    return Buffer.from(str, 'base64').toString('binary');
}
exports.autoAtob = autoAtob;
