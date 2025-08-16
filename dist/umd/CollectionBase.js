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
        define(["require", "exports", "tslib", "@tsdotnet/compare", "./ReadOnlyCollectionBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require("tslib");
    const compare_1 = require("@tsdotnet/compare");
    const ReadOnlyCollectionBase_1 = tslib_1.__importDefault(require("./ReadOnlyCollectionBase"));
    /**
     * Base class for implementing an externally modifiable collection.
     */
    class CollectionBase extends ReadOnlyCollectionBase_1.default {
        _count = 0;
        constructor(equalityComparer = compare_1.areEqual) {
            super(equalityComparer);
        }
        /**
         * Returns the current number of entries.
         * @returns {number}
         */
        getCount() {
            return this._count;
        }
        /**
         * Adds an entry to the collection.
         * @param entry
         */
        add(entry) {
            if (this._addInternal(entry)) {
                this._count++;
                this.incrementVersion();
            }
            return this;
        }
        /**
         * Removes entries from the collection allowing for a limit.
         * For example if the collection not a distinct set, more than one entry could be removed.
         * @param entry The entry to remove.
         * @param max Limit of entries to remove.  Will remove all matches if no max specified.
         * @returns {number} The number of entries removed.
         */
        remove(entry, max = Infinity) {
            const n = this._removeInternal(entry, max);
            if (n) {
                this._count -= n;
                this.incrementVersion();
            }
            return n;
        }
        /**
         * Clears the contents of the collection resulting in a count of zero.
         * @returns {number}
         */
        clear() {
            const n = this._clearInternal();
            if (n)
                this.incrementVersion();
            this._count = 0;
            return n;
        }
        /**
         * Safely imports the contents of an iterable.
         * @param entries
         * @returns {number}
         */
        addEntries(entries) {
            if (!entries)
                return 0;
            const n = this._addEntries(entries);
            if (n) {
                this._count += n;
                this.incrementVersion();
            }
            return n;
        }
        /**
         * Clears the collection.
         * Provided for compatibility with disposal routines.
         */
        dispose() {
            this.clear();
        }
        _addEntries(entries) {
            let added = 0;
            if (entries) {
                for (const e of entries) {
                    if (this._addInternal(e))
                        added++;
                }
            }
            return added;
        }
    }
    exports.default = CollectionBase;
});
//# sourceMappingURL=CollectionBase.js.map