import { areEqual } from '@tsdotnet/compare';
import IterableCollectionBase from './IterableCollectionBase.js';

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
class ReadOnlyCollectionBase extends IterableCollectionBase {
    _equalityComparer;
    constructor(_equalityComparer = areEqual) {
        super();
        this._equalityComparer = _equalityComparer;
    }
    get count() {
        return this.getCount();
    }
    contains(entry) {
        for (const e of this) {
            if (this._equalityComparer(e, entry))
                return true;
        }
        return false;
    }
}

export { ReadOnlyCollectionBase as default };
//# sourceMappingURL=ReadOnlyCollectionBase.js.map
