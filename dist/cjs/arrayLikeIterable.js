"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = arrayLikeIterable;
const tslib_1 = require("tslib");
const indexIterable_1 = tslib_1.__importDefault(require("./indexIterable"));
/**
 * Ensures an iterable from an `ArrayLike` object.
 * If is an instance of an Array, will return the array directly.
 * @param {ArrayLike<T>} source
 * @return {Iterable<T>}
 */
function arrayLikeIterable(source) {
    if (source instanceof Array)
        return source;
    return (0, indexIterable_1.default)(source);
}
//# sourceMappingURL=arrayLikeIterable.js.map