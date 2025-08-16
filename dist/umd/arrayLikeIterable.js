/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./indexIterable"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=arrayLikeIterable.js.map