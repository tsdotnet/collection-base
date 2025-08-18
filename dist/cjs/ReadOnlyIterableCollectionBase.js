"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedIterable = void 0;
const tslib_1 = require("tslib");
const exceptions_1 = require("@tsdotnet/exceptions");
const copyIterableTo_1 = tslib_1.__importDefault(require("./copyIterableTo"));
const IterableBase_1 = tslib_1.__importDefault(require("./IterableBase"));
class ReadOnlyIterableCollectionBase extends IterableBase_1.default {
    constructor() {
        super();
    }
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
    map(selector) {
        if (!selector)
            throw new exceptions_1.ArgumentNullException('selector');
        return ExtendedIterable.create(super.map(selector));
    }
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
    copyTo(target, index = 0) {
        return (0, copyIterableTo_1.default)(this, target, index);
    }
    toArray() {
        return this.copyTo([]);
    }
    getCount() {
        let count = 0;
        for (const _ of this)
            count++;
        return count;
    }
}
exports.default = ReadOnlyIterableCollectionBase;
class ExtendedIterable extends ReadOnlyIterableCollectionBase {
    constructor(_source) {
        super();
        this._source = _source;
    }
    static create(source) {
        return new ExtendedIterable(source);
    }
    _getIterator() {
        return this._source[Symbol.iterator]();
    }
}
exports.ExtendedIterable = ExtendedIterable;
//# sourceMappingURL=ReadOnlyIterableCollectionBase.js.map