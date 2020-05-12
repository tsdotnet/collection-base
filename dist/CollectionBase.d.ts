import { PredicateWithIndex } from '@tsdotnet/common-interfaces';
import { EqualityComparison } from '@tsdotnet/compare/dist/Comparable';
import Collection from './Collection';
import ReadOnlyCollectionBase from './ReadOnlyCollectionBase';
export default abstract class CollectionBase<T> extends ReadOnlyCollectionBase<T> implements Collection<T> {
    private _count;
    protected constructor(equalityComparer?: EqualityComparison<T>);
    /**
     * Returns the current number of entries.
     * @returns {number}
     */
    getCount(): number;
    /**
     * Adds an entry to the collection.
     * @param entry
     */
    add(entry: T): this;
    /**
     * Removes entries from the collection allowing for a limit.
     * For example if the collection not a distinct set, more than one entry could be removed.
     * @param entry The entry to remove.
     * @param max Limit of entries to remove.  Will remove all matches if no max specified.
     * @returns {number} The number of entries removed.
     */
    remove(entry: T, max?: number): number;
    /**
     * Clears the contents of the collection resulting in a count of zero.
     * @returns {number}
     */
    clear(): number;
    /**
     * Safely imports the contents of an iterable.
     * @param entries
     * @returns {number}
     */
    addEntries(entries: Iterable<T>): number;
    /**
     * Returns an iterable filtered by the provided predicate.
     * @param predicate
     * @returns {[]}
     */
    filter(predicate: PredicateWithIndex<T>): Iterable<T>;
    dispose(): void;
    protected abstract _addInternal(entry: T): boolean;
    protected abstract _removeInternal(entry: T, max?: number): number;
    protected abstract _clearInternal(): number;
    protected _addEntries(entries: Iterable<T> | null | undefined): number;
}
