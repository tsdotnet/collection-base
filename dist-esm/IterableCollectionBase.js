/**
 * @packageDocumentation
 * @module collection-base
 */
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import InvalidOperationException from '@tsdotnet/exceptions/dist/InvalidOperationException';
import ReadOnlyIterableCollectionBase from './ReadOnlyIterableCollectionBase';
/**
 * Base class for implementing an iterable (finite) collection.
 */
export default class IterableCollectionBase extends ReadOnlyIterableCollectionBase {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {
        super();
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
     * Increments the collection version.
     * Useful for tracking changes.
     * @return {number} The new version.
     */
    incrementVersion() {
        return ++this._version;
    }
}
//# sourceMappingURL=IterableCollectionBase.js.map