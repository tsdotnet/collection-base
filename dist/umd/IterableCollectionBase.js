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
        define(["require", "exports", "tslib", "@tsdotnet/exceptions", "./ReadOnlyIterableCollectionBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require("tslib");
    const exceptions_1 = require("@tsdotnet/exceptions");
    const ReadOnlyIterableCollectionBase_1 = tslib_1.__importDefault(require("./ReadOnlyIterableCollectionBase"));
    /**
     * Base class for implementing an iterable (finite) collection.
     */
    class IterableCollectionBase extends ReadOnlyIterableCollectionBase_1.default {
        constructor() {
            super();
        }
        // Provides an easy means of tracking changes and invalidating enumerables.
        // Leave as possible undefined to avoid confusion with sub classes that don't use it directly.
        _version;
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
                throw new exceptions_1.InvalidOperationException('Version mismatch. The collection was modified.');
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
});
//# sourceMappingURL=IterableCollectionBase.js.map