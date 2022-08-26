"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(clusterTimecode) {
    var cuePoint = {
        id: 0xbb,
        data: [{
                data: Math.round(clusterTimecode),
                id: 0xb3,
            },
            {
                id: 0xb7,
                data: [{
                        data: 1,
                        id: 0xf7,
                    },
                    {
                        data: 0,
                        size: 8,
                        id: 0xf1,
                    },
                ],
            },
        ],
    };
    return cuePoint;
}
exports.default = default_1;
