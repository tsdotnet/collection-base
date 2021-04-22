/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { ArrayLikeWritable, PredicateWithIndex, SelectorWithIndex } from '@tsdotnet/common-interfaces';
import IterableBase from './IterableBase';
/**
 * Base class for implementing finite read-only iterables.
 */
export default abstract class ReadOnlyIterableCollectionBase<T> extends IterableBase<T> {
    protected constructor();
    /**
     * Returns an iterable filtered by the provided predicate.
     * @param {PredicateWithIndex<T>} predicate
     * @return {Iterable<T>}
     */
    filter(predicate: PredicateWithIndex<T>): ExtendedIterable<T>;
    /**
     * Returns an iterable mapped by the provided selector.
     * @param {SelectorWithIndex<T, TResult>} selector
     * @return {Iterable<TResult>}
     */
    map<TResult>(selector: SelectorWithIndex<T, TResult>): ExtendedIterable<TResult>;
    /**
     * Applies a reducer function to all the elements in this sequence.
     * The first entry is used as the initial accumulator value, and the specified function is used to select the result value.
     * @throws If the sequence is empty.
     * @param {(previous: (T | undefined), current: T, index: number) => T} reduction
     * @return {IterableTransform<T, T | undefined>}
     */
    reduce<T>(reduction: (previous: T, current: T, index: number) => T): T;
    /**
     * Applies a reducer function to all the elements in this sequence.
     * The specified seed value is used as the initial accumulator value, and the specified function is used to select the result value.
     * @param {(previous: U, current: T, index: number) => U} reduction
     * @param {U} initialValue
     * @return {IterableTransform<T, U>}
     */
    reduce<T, U>(reduction: (previous: U, current: T, index: number) => U, initialValue: U): U;
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
}
/**
 * Extends an iterable with methods like filter, map, and reduce.
 */
export declare class ExtendedIterable<T> extends ReadOnlyIterableCollectionBase<T> {
    private _source;
    protected constructor(_source: Iterable<T>);
    /**
     * Creates an ExtendedIterable wrapper for the provided source.
     * @param {Iterable<T>} source
     * @return {ExtendedIterable<T>}
     */
    static create<T>(source: Iterable<T>): ExtendedIterable<T>;
    protected _getIterator(): Iterator<T>;
}
