"use strict";
/**
 * @packageDocumentation
 * @module collection-base
 */
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const InvalidOperationException_1 = tslib_1.__importDefault(require("@tsdotnet/exceptions/dist/InvalidOperationException"));
const ReadOnlyIterableCollectionBase_1 = tslib_1.__importDefault(require("./ReadOnlyIterableCollectionBase"));
/**
 * Base class for implementing an iterable (finite) collection.
 */
class IterableCollectionBase extends ReadOnlyIterableCollectionBase_1.default {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {
        super();
    }
    /**
     * The version number used to track changes.
     * @returns {number}
     */
    get version() {
        return this._version || 0 | 0;
    }
    /**
     * Throws if the provided version does not match the current one.
     * @param {number} version
     * @returns {boolean}
     */
    assertVersion(version) {
        if (version !== this.version)
            throw new InvalidOperationException_1.default('Version mismatch. The collection was modified.');
        return true;
    }
    *[Symbol.iterator]() {
        const version = this.version; // since version can be overridden, be sure to use public.
        const i = this._getIterator();
        let n = i.next();
        while (!n.done) {
            yield n.value;
            this.assertVersion(version);
            n = i.next();
        }
    }
    /**
     * Increments the collection version.
     * Useful for tracking changes.
     * @return {number} The new version.
     */
    incrementVersion() {
        if (this._version)
            return ++this._version;
        return this._version = 1 | 0;
    }
}
exports.default = IterableCollectionBase;
//# sourceMappingURL=IterableCollectionBase.js.map