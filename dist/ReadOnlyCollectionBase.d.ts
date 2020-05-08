import { EqualityComparison } from '@tsdotnet/compare';
import ReadOnlyCollection from './ReadOnlyCollection';
import IterableCollectionBase from './IterableCollectionBase';
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
