/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
import InvalidOperationException from '@tsdotnet/exceptions/dist/InvalidOperationException';
import copyIterableTo from './copyIterableTo';
export default class IterableCollectionBase {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {
        this._version = 0; // Provides an easy means of tracking changes and invalidating enumerables.
    }
    /**
     * The version number used to track changes.
     * @returns {number}
     */
    get version() {
        return this._version;
    }
    /**
     * Throws if the provided version does not match the current one.
     * @param {number} version
     * @returns {boolean}
     */
    assertVersion(version) {
        if (version !== this._version)
            throw new InvalidOperationException('Version mismatch. The collection was modified.');
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
     * Copies all values to a numerically indexable object.
     * @param {TTarget} target
     * @param {number} index
     * @returns {TTarget}
     */
    copyTo(target, index = 0) {
        return copyIterableTo(this, target, index);
    }
    /**
     * Creates a copy of the contents as an array.
     * @returns {[]}
     */
    toArray() {
        return this.copyTo([]);
    }
    /**
     * Returns the number of items contained in the collection by iterating the contents.
     * @returns {number}
     */
    getCount() {
        let count = 0;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const _ of this) {
            count++;
        }
        return count;
    }
    /**
     * Increments the collection version.
     * Useful for tracking changes.
     * @return {number} The new version.
     */
    incrementVersion() {
        return ++this._version;
    }
}
//# sourceMappingURL=IterableCollectionBase.js.map