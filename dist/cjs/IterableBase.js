"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("@tsdotnet/exceptions");
class IterableBase {
    constructor() { }
    [Symbol.iterator]() {
        return this._getIterator();
    }
    map(selector) {
        if (!selector)
            throw new exceptions_1.ArgumentNullException('selector');
        const _ = this;
        return {
            *[Symbol.iterator]() {
                let i = 0;
                for (const e of _)
                    yield selector(e, i++);
            }
        };
    }
}
exports.default = IterableBase;
//# sourceMappingURL=IterableBase.js.map