/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
import areEqual from '@tsdotnet/compare/dist/areEqual';
import IterableCollectionBase from './IterableCollectionBase';
export default class ReadOnlyCollectionBase extends IterableCollectionBase {
    constructor(_equalityComparer = areEqual) {
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
//# sourceMappingURL=ReadOnlyCollectionBase.js.map