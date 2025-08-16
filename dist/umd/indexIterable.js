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
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = indexIterable;
    /**
     * Returns an iterable that iterates an `ArrayLike` object by index.
     * @param {ArrayLike<T>} source
     * @return {Iterable<T>}
     */
    function indexIterable(source) {
        return {
            *[Symbol.iterator]() {
                const len = source?.length;
                if (len) {
                    for (let i = 0; i < len; i++) {
                        yield source[i];
                    }
                }
            }
        };
    }
});
//# sourceMappingURL=indexIterable.js.map