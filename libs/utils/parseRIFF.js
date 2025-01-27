"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseRIFF(str) {
    var offset = 0;
    var chunks = {};
    while (offset < str.length) {
        var id = str.substr(offset, 4);
        chunks[id] = chunks[id] || [];
        if (id === 'RIFF' || id === 'LIST') {
            var len = parseInt(str.substr(offset + 4, 4).split('').map(function (i) {
                var unPadded = i.charCodeAt(0).toString(2);
                return (new Array(8 - unPadded.length + 1)).join('0') + unPadded;
            }).join(''), 2);
            var data = str.substr(offset + 4 + 4, len);
            offset += 4 + 4 + len;
            chunks[id].push(parseRIFF(data));
        }
        else if (id === 'WEBP') {
            // Use (offset + 8) to skip past "VP8 "/"VP8L"/"VP8X" field after "WEBP"
            chunks[id].push(str.substr(offset + 8));
            offset = str.length;
        }
        else {
            // Unknown chunk type; push entire payload
            chunks[id].push(str.substr(offset + 4));
            offset = str.length;
        }
    }
    return chunks;
}
exports.default = parseRIFF;
