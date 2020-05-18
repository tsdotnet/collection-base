/**
 * @packageDocumentation
 * @module collection-base
 */
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import ArgumentNullException from '@tsdotnet/exceptions/dist/ArgumentNullException';
import InvalidOperationException from '@tsdotnet/exceptions/dist/InvalidOperationException';
import copyIterableTo from './copyIterableTo';
import IterableBase from './IterableBase';
/**
 * Base class for implementing finite read-only iterables.
 */
export default class ReadOnlyIterableCollectionBase extends IterableBase {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {
        super();
    }
    /**
     * Returns an iterable filtered by the provided predicate.
     * @param {PredicateWithIndex<T>} predicate
     * @return {Iterable<T>}
     */
    filter(predicate) {
        if (!predicate)
            throw new ArgumentNullException('predicate');
        const _ = this;
        return ExtendedIterable.create({
            *[Symbol.iterator]() {
                let i = 0;
                for (const e of _)
                    if (predicate(e, i++))
                        yield e;
            }
        });
    }
    /**
     * Returns an iterable mapped by the provided selector.
     * @param {SelectorWithIndex<T, TResult>} selector
     * @return {Iterable<TResult>}
     */
    map(selector) {
        if (!selector)
            throw new ArgumentNullException('selector');
        return ExtendedIterable.create(super.map(selector));
    }
    // noinspection DuplicatedCode
    /**
     * Applies a reducer function to all the elements in this sequence.
     * The specified `initialValue` is used as the initial accumulator value, and the specified function is used to select the result value.
     * If no `initialValue` is specified, the first entry in the sequence is used.
     * @param {(previous: U, current: T, index: number) => U} reducer
     * @param {U} initialValue Optional initial value to begin with.
     * @return {U}
     */
    reduce(reducer, initialValue) {
        if (!reducer)
            throw new ArgumentNullException('reducer');
        let i = 0;
        if (initialValue === undefined) {
            const iterator = this[Symbol.iterator]();
            let n = iterator.next();
            if (n.done)
                throw new InvalidOperationException('Sequence is empty.  Specify an initial value allow for an empty iterable.');
            let previous = n.value;
            while (!(n = iterator.next()).done)
                previous = reducer(previous, n.value, ++i);
            return previous;
        }
        else {
            let previous = initialValue;
            for (const current of this)
                previous = reducer(previous, current, i++);
            return previous;
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
        for (const _ of this)
            count++;
        return count;
    }
}
/**
 * Extends an iterable with methods like filter, map, and reduce.
 */
export class ExtendedIterable extends ReadOnlyIterableCollectionBase {
    constructor(_source) {
        super();
        this._source = _source;
    }
    _getIterator() {
        return this._source[Symbol.iterator]();
    }
    /**
     * Creates an ExtendedIterable wrapper for the provided source.
     * @param {Iterable<T>} source
     * @return {ExtendedIterable<T>}
     */
    static create(source) {
        return new ExtendedIterable(source);
    }
}
//# sourceMappingURL=ReadOnlyIterableCollectionBase.js.map