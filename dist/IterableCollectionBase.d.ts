/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import ReadOnlyIterableCollectionBase from './ReadOnlyIterableCollectionBase';
/**
 * Base class for implementing an iterable (finite) collection.
 */
export default abstract class IterableCollectionBase<T> extends ReadOnlyIterableCollectionBase<T> {
    protected constructor();
    private _version?;
    /**
     * The version number used to track changes.
     * @returns {number}
     */
    get version(): number;
    /**
     * Throws if the provided version does not match the current one.
     * @param {number} version
     * @returns {boolean}
     */
    assertVersion(version: number): true | never;
    [Symbol.iterator](): Iterator<T>;
    /**
     * Increments the collection version.
     * Useful for tracking changes.
     * @return {number} The new version.
     */
    incrementVersion(): number;
}
