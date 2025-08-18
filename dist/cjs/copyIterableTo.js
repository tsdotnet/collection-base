"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = copyIterableTo;
const exceptions_1 = require("@tsdotnet/exceptions");
function copyIterableTo(source, target, index = 0) {
    if (!target)
        throw new exceptions_1.ArgumentNullException('target');
    for (const e of source) {
        target[index++] = e;
    }
    return target;
}
//# sourceMappingURL=copyIterableTo.js.map