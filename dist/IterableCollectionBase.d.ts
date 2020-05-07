/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
import { ArrayLikeWritable } from '@tsdotnet/common-interfaces';
export default abstract class IterableCollectionBase<T> {
    /**
     * Returns the number of items contained in the collection by iterating the contents.
     * @returns {number}
     */
    protected getCount(): number;
    protected _version: number;
    protected _incrementVersion(): void;
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
    /**
     * Override to define the actual iterator.
     * The [Symbol.iterator] should not be overridden as it handles version tracking.
     * @returns {Iterator}
     * @private
     */
    protected abstract _getIterator(): Iterator<T>;
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
}
