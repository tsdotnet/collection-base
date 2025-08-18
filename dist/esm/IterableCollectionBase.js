import { InvalidOperationException } from '@tsdotnet/exceptions';
import ReadOnlyIterableCollectionBase from './ReadOnlyIterableCollectionBase.js';

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
class IterableCollectionBase extends ReadOnlyIterableCollectionBase {
    constructor() {
        super();
    }
    _version;
    get version() {
        return this._version || 0 | 0;
    }
    assertVersion(version) {
        if (version !== this.version)
            throw new InvalidOperationException('Version mismatch. The collection was modified.');
        return true;
    }
    *[Symbol.iterator]() {
        const version = this.version;
        const i = this._getIterator();
        let n = i.next();
        while (!n.done) {
            yield n.value;
            this.assertVersion(version);
            n = i.next();
        }
    }
    incrementVersion() {
        if (this._version)
            return ++this._version;
        return this._version = 1 | 0;
    }
}

export { IterableCollectionBase as default };
//# sourceMappingURL=IterableCollectionBase.js.map
