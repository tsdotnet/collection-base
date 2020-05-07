"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const exceptions_1 = require("@tsdotnet/exceptions");
const copyIterableTo_1 = tslib_1.__importDefault(require("./copyIterableTo"));
class IterableCollectionBase {
    constructor() {
        this._version = 0; // Provides an easy means of tracking changes and invalidating enumerables.
    }
    /**
     * Returns the number of items contained in the collection by iterating the contents.
     * @returns {number}
     */
    getCount() {
        let count = 0;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const _ of this) {
            count++;
        }
        return count;
    }
    _incrementVersion() {
        ++this._version;
    }
    /**
     * The version number used to track changes.
     * @returns {number}
     */
    get version() {
        return this._version;
    }
    /**
     * Throws if the provided version does not match the current one.
     * @param {number} version
     * @returns {boolean}
     */
    assertVersion(version) {
        if (version !== this._version)
            throw new exceptions_1.InvalidOperationException('Version mismatch. The collection was modified.');
        return true;
    }
    *[Symbol.iterator]() {
        const version = this._version;
        const i = this._getIterator();
        let n = i.next();
        while (!n.done) {
            yield n.value;
            this.assertVersion(version);
            n = i.next();
        }
    }
    /**
     * Copies all values to a numerically indexable object.
     * @param {TTarget} target
     * @param {number} index
     * @returns {TTarget}
     */
    copyTo(target, index = 0) {
        return copyIterableTo_1.default(this, target, index);
    }
    /**
     * Creates a copy of the contents as an array.
     * @returns {[]}
     */
    toArray() {
        return this.copyTo([]);
    }
}
exports.default = IterableCollectionBase;
//# sourceMappingURL=IterableCollectionBase.js.map