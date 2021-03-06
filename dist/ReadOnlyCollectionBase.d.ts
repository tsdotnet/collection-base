/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { EqualityComparison } from '@tsdotnet/compare/dist/Comparable';
import IterableCollectionBase from './IterableCollectionBase';
import ReadOnlyCollection from './ReadOnlyCollection';
/**
 * Base class for implementing an internally modifiable, eternally read-only collection.
 */
export default abstract class ReadOnlyCollectionBase<T> extends IterableCollectionBase<T> implements ReadOnlyCollection<T> {
    protected _equalityComparer: EqualityComparison<T>;
    protected constructor(_equalityComparer?: EqualityComparison<T>);
    /**
     * Returns the current number of entries.
     * @returns {number}
     */
    get count(): number;
    /**
     * Returns true if the equality comparer resolves true on any element in the collection.
     * @param entry
     * @returns {boolean}
     */
    contains(entry: T): boolean;
}
