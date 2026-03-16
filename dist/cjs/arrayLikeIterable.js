"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = arrayLikeIterable;
const tslib_1 = require("tslib");
const indexIterable_js_1 = tslib_1.__importDefault(require("./indexIterable.js"));
function arrayLikeIterable(source) {
    if (source instanceof Array)
        return source;
    return (0, indexIterable_js_1.default)(source);
}
//# sourceMappingURL=arrayLikeIterable.js.map