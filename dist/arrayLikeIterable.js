"use strict";
/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexIterable = void 0;
function arrayLikeIterable(source) {
    if (source instanceof Array)
        return source;
    return indexIterable(source);
}
exports.default = arrayLikeIterable;
function* indexIterable(source) {
    const len = source === null || source === void 0 ? void 0 : source.length;
    if (len) {
        for (let i = 0; i < len; i++) {
            yield source[i];
        }
    }
}
exports.indexIterable = indexIterable;
//# sourceMappingURL=arrayLikeIterable.js.map