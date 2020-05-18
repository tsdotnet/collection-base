/**
 * @packageDocumentation
 * @module collection-base
 */
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import ArgumentNullException from '@tsdotnet/exceptions/dist/ArgumentNullException';
/*
 * NOTE: Care should be taken not to introduce methods here that would cause an iterable to never complete.
 * A 'filter' method for example could perpetually loop with a predicate that never returns true.
 */
/**
 * Some iterables/generators can be infinite.
 * This class is provided as a base for implementing any iterable including endless ones.
 */
export default class IterableBase {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }
    [Symbol.iterator]() {
        return this._getIterator();
    }
    /**
     * Returns an iterable mapped by the provided selector.
     * @param {SelectorWithIndex<T, TResult>} selector
     * @return {Iterable<TResult>}
     */
    map(selector) {
        if (!selector)
            throw new ArgumentNullException('selector');
        const _ = this;
        return {
            *[Symbol.iterator]() {
                let i = 0;
                for (const e of _)
                    yield selector(e, i++);
            }
        };
    }
}
//# sourceMappingURL=IterableBase.js.map