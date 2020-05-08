"use strict";
/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const compare_1 = require("@tsdotnet/compare");
const IterableCollectionBase_1 = tslib_1.__importDefault(require("./IterableCollectionBase"));
class ReadOnlyCollectionBase extends IterableCollectionBase_1.default {
    constructor(_equalityComparer = compare_1.areEqual) {
        super();
        this._equalityComparer = _equalityComparer;
    }
    /**
     * Returns the current number of entries.
     * @returns {number}
     */
    get count() {
        return this.getCount();
    }
    /**
     * Returns true if the equality comparer resolves true on any element in the collection.
     * @param entry
     * @returns {boolean}
     */
    contains(entry) {
        for (const e of this) {
            if (this._equalityComparer(e, entry))
                return true;
        }
        return false;
    }
}
exports.default = ReadOnlyCollectionBase;
//# sourceMappingURL=ReadOnlyCollectionBase.js.map