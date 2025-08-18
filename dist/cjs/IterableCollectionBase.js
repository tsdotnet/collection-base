"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const exceptions_1 = require("@tsdotnet/exceptions");
const ReadOnlyIterableCollectionBase_1 = tslib_1.__importDefault(require("./ReadOnlyIterableCollectionBase"));
class IterableCollectionBase extends ReadOnlyIterableCollectionBase_1.default {
    constructor() {
        super();
    }
    get version() {
        return this._version || 0 | 0;
    }
    assertVersion(version) {
        if (version !== this.version)
            throw new exceptions_1.InvalidOperationException('Version mismatch. The collection was modified.');
        return true;
    }
    *[Symbol.iterator]() {
        const version = this.version;
        const i = this._getIterator();
        let n = i.next();
        while (!n.done) {
            yield n.value;
            this.assertVersion(version);
            n = i.next();
        }
    }
    incrementVersion() {
        if (this._version)
            return ++this._version;
        return this._version = 1 | 0;
    }
}
exports.default = IterableCollectionBase;
//# sourceMappingURL=IterableCollectionBase.js.map