"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const compare_1 = require("@tsdotnet/compare");
const ReadOnlyCollectionBase_1 = tslib_1.__importDefault(require("./ReadOnlyCollectionBase"));
class CollectionBase extends ReadOnlyCollectionBase_1.default {
    constructor(equalityComparer = compare_1.areEqual) {
        super(equalityComparer);
        this._count = 0;
    }
    getCount() {
        return this._count;
    }
    add(entry) {
        if (this._addInternal(entry)) {
            this._count++;
            this.incrementVersion();
        }
        return this;
    }
    remove(entry, max = Infinity) {
        const n = this._removeInternal(entry, max);
        if (n) {
            this._count -= n;
            this.incrementVersion();
        }
        return n;
    }
    clear() {
        const n = this._clearInternal();
        if (n)
            this.incrementVersion();
        this._count = 0;
        return n;
    }
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