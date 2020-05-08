"use strict";
/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const compare_1 = require("@tsdotnet/compare");
const ReadOnlyCollectionBase_1 = tslib_1.__importDefault(require("./ReadOnlyCollectionBase"));
const ArgumentNullException_1 = tslib_1.__importDefault(require("@tsdotnet/exceptions/dist/ArgumentNullException"));
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-this-alias */
class CollectionBase extends ReadOnlyCollectionBase_1.default {
    constructor(initialValues, equalityComparer = compare_1.areEqual) {
        super(equalityComparer);
        this._count = 0;
        if (initialValues)
            this.addEntries(initialValues);
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
            this._incrementVersion();
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
            this._incrementVersion();
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
            this._incrementVersion();
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
            this._incrementVersion();
        }
        return n;
    }
    /**
     * Returns an iterable filtered by the provided predicate.
     * @param predicate
     * @returns {[]}
     */
    *filter(predicate) {
        if (!predicate)
            throw new ArgumentNullException_1.default('predicate');
        let i = 0;
        for (const e of this) {
            if (predicate(e, i++))
                yield e;
        }
    }
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
//# sourceMappingURL=CollectionBase.js.map