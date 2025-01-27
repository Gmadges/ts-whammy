"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var toWebM_1 = tslib_1.__importDefault(require("./utils/toWebM"));
var parseWebP_1 = tslib_1.__importDefault(require("./utils/parseWebP"));
var parseRIFF2_1 = tslib_1.__importDefault(require("./utils/parseRIFF2"));
var adaptor_1 = require("./utils/adaptor");
var defaultFps = 1;
exports.default = {
    fromImageArray: function (images, fps, outputAsArray) {
        var curOutputAsArray = typeof Blob !== 'undefined' ? outputAsArray : true;
        var curFps = fps || defaultFps;
        return toWebM_1.default(images.map(function (image) {
            var webp = parseWebP_1.default(parseRIFF2_1.default(adaptor_1.autoAtob(image.slice(23))));
            var webpFrame = tslib_1.__assign({}, webp, { duration: 1000 / curFps });
            return webpFrame;
        }), curOutputAsArray);
    },
    fromImageArrayWithOptions: function (images, options) {
        if (options === void 0) { options = {}; }
        var fps = options.fps, duration = options.duration, outputAsArray = options.outputAsArray;
        var curFps = fps || defaultFps;
        if (duration) {
            curFps = 1000 / ((duration * 1000) / images.length);
        }
        return this.fromImageArray(images, curFps, outputAsArray);
    },
};
