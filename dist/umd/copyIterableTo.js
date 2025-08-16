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
        define(["require", "exports", "@tsdotnet/exceptions"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = copyIterableTo;
    const exceptions_1 = require("@tsdotnet/exceptions");
    /**
     * Copies all values to a numerically indexable object.
     * @param {Iterable} source
     * @param target
     * @param {number?} index
     * @returns target
     */
    function copyIterableTo(source, target, index = 0) {
        if (!target)
            throw new exceptions_1.ArgumentNullException('target');
        for (const e of source) {
            target[index++] = e;
        }
        return target;
    }
});
//# sourceMappingURL=copyIterableTo.js.map