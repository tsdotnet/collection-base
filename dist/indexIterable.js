"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns an iterable that iterates an `ArrayLike` object by index.
 * @param {ArrayLike<T>} source
 * @return {Iterable<T>}
 */
function indexIterable(source) {
    return {
        *[Symbol.iterator]() {
            const len = source === null || source === void 0 ? void 0 : source.length;
            if (len) {
                for (let i = 0; i < len; i++) {
                    yield source[i];
                }
            }
        }
    };
}
exports.default = indexIterable;
//# sourceMappingURL=indexIterable.js.map