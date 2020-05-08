/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
import { ArrayLikeWritable } from '@tsdotnet/common-interfaces';
export default abstract class IterableCollectionBase<T> {
    private _version;
    protected constructor();
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
     * Copies all values to a numerically indexable object.
     * @param {TTarget} target
     * @param {number} index
     * @returns {TTarget}
     */
    copyTo<TTarget extends ArrayLikeWritable<T>>(target: TTarget, index?: number): TTarget;
    /**
     * Creates a copy of the contents as an array.
     * @returns {[]}
     */
    toArray(): T[];
    /**
     * Returns the number of items contained in the collection by iterating the contents.
     * @returns {number}
     */
    getCount(): number;
    /**
     * Increments the collection version.
     * Useful for tracking changes.
     * @return {number} The new version.
     */
    incrementVersion(): number;
    /**
     * Override to define the actual iterator.
     * The [Symbol.iterator] should not be overridden as it handles version tracking.
     * @returns {Iterator}
     * @private
     */
    protected abstract _getIterator(): Iterator<T>;
}
