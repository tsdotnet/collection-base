/**
 * @packageDocumentation
 * @module collection-base
 */
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { SelectorWithIndex } from '@tsdotnet/common-interfaces';
/**
 * Some iterables/generators can be infinite.
 * This class is provided as a base for implementing any iterable including endless ones.
 */
export default abstract class IterableBase<T> implements Iterable<T> {
    protected constructor();
    [Symbol.iterator](): Iterator<T>;
    /**
     * Returns an iterable mapped by the provided selector.
     * @param {SelectorWithIndex<T, TResult>} selector
     * @return {Iterable<TResult>}
     */
    map<TResult>(selector: SelectorWithIndex<T, TResult>): Iterable<TResult>;
    /**
     * Override to define the actual iterator.
     * The [Symbol.iterator] should not be overridden as it handles version tracking.
     * @returns {Iterator}
     * @private
     */
    protected abstract _getIterator(): Iterator<T>;
}
