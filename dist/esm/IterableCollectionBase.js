/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { InvalidOperationException } from '@tsdotnet/exceptions';
import ReadOnlyIterableCollectionBase from './ReadOnlyIterableCollectionBase';
/**
 * Base class for implementing an iterable (finite) collection.
 */
export default class IterableCollectionBase extends ReadOnlyIterableCollectionBase {
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
//# sourceMappingURL=IterableCollectionBase.js.map