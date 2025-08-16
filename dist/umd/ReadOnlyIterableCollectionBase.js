/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@tsdotnet/exceptions", "./copyIterableTo", "./IterableBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExtendedIterable = void 0;
    const tslib_1 = require("tslib");
    const exceptions_1 = require("@tsdotnet/exceptions");
    const copyIterableTo_1 = tslib_1.__importDefault(require("./copyIterableTo"));
    const IterableBase_1 = tslib_1.__importDefault(require("./IterableBase"));
    /**
     * Base class for implementing finite read-only iterables.
     */
    class ReadOnlyIterableCollectionBase extends IterableBase_1.default {
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
                throw new exceptions_1.ArgumentNullException('predicate');
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
                throw new exceptions_1.ArgumentNullException('selector');
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
                throw new exceptions_1.ArgumentNullException('reducer');
            let i = 0;
            if (initialValue === undefined) {
                const iterator = this[Symbol.iterator]();
                let n = iterator.next();
                if (n.done)
                    throw new exceptions_1.InvalidOperationException('Sequence is empty.  Specify an initial value allow for an empty iterable.');
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
            return (0, copyIterableTo_1.default)(this, target, index);
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
    exports.default = ReadOnlyIterableCollectionBase;
    /**
     * Extends an iterable with methods like filter, map, and reduce.
     */
    class ExtendedIterable extends ReadOnlyIterableCollectionBase {
        _source;
        constructor(_source) {
            super();
            this._source = _source;
        }
        /**
         * Creates an ExtendedIterable wrapper for the provided source.
         * @param {Iterable<T>} source
         * @return {ExtendedIterable<T>}
         */
        static create(source) {
            return new ExtendedIterable(source);
        }
        _getIterator() {
            return this._source[Symbol.iterator]();
        }
    }
    exports.ExtendedIterable = ExtendedIterable;
});
//# sourceMappingURL=ReadOnlyIterableCollectionBase.js.map