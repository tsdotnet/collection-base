"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ArgumentNullException_1 = (0, tslib_1.__importDefault)(require("@tsdotnet/exceptions/dist/ArgumentNullException"));
/**
 * Copies all values to a numerically indexable object.
 * @param {Iterable} source
 * @param target
 * @param {number?} index
 * @returns target
 */
function copyIterableTo(source, target, index = 0) {
    if (!target)
        throw new ArgumentNullException_1.default('target');
    for (const e of source) {
        target[index++] = e;
    }
    return target;
}
exports.default = copyIterableTo;
//# sourceMappingURL=copyIterableTo.js.map