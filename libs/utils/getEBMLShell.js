"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
function getEBMLShell(info) {
    var EBML = [{
            id: 0x1a45dfa3,
            data: [{
                    data: 1,
                    id: 0x4286,
                },
                {
                    data: 1,
                    id: 0x42f7,
                },
                {
                    data: 4,
                    id: 0x42f2,
                },
                {
                    data: 8,
                    id: 0x42f3,
                },
                {
                    data: 'webm',
                    id: 0x4282,
                },
                {
                    data: 2,
                    id: 0x4287,
                },
                {
                    data: 2,
                    id: 0x4285,
                },
            ],
        },
        {
            id: 0x18538067,
            data: [{
                    id: 0x1549a966,
                    data: [{
                            data: 1e6,
                            id: 0x2ad7b1,
                        },
                        {
                            data: 'whammy',
                            id: 0x4d80,
                        },
                        {
                            data: 'whammy',
                            id: 0x5741,
                        },
                        {
                            data: base_1.doubleToString(info.duration),
                            id: 0x4489,
                        },
                    ],
                },
                {
                    id: 0x1654ae6b,
                    data: [{
                            id: 0xae,
                            data: [{
                                    data: 1,
                                    id: 0xd7,
                                },
                                {
                                    data: 1,
                                    id: 0x73c5,
                                },
                                {
                                    data: 0,
                                    id: 0x9c,
                                },
                                {
                                    data: 'und',
                                    id: 0x22b59c,
                                },
                                {
                                    data: 'V_VP8',
                                    id: 0x86,
                                },
                                {
                                    data: 'VP8',
                                    id: 0x258688,
                                },
                                {
                                    data: 1,
                                    id: 0x83,
                                },
                                {
                                    id: 0xe0,
                                    data: [{
                                            data: info.width,
                                            id: 0xb0,
                                        },
                                        {
                                            data: info.height,
                                            id: 0xba,
                                        },
                                    ],
                                },
                            ],
                        }],
                },
                {
                    id: 0x1c53bb6b,
                    data: [
                    // cue insertion point
                    ],
                },
            ],
        },
    ];
    return EBML;
}
exports.default = getEBMLShell;
