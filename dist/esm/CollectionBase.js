import { areEqual } from '@tsdotnet/compare';
import ReadOnlyCollectionBase from './ReadOnlyCollectionBase.js';

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
class CollectionBase extends ReadOnlyCollectionBase {
    _count = 0;
    constructor(equalityComparer = areEqual) {
        super(equalityComparer);
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

export { CollectionBase as default };
//# sourceMappingURL=CollectionBase.js.map
