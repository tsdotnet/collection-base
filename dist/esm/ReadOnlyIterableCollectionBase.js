import { ArgumentNullException, InvalidOperationException } from '@tsdotnet/exceptions';
import copyIterableTo from './copyIterableTo.js';
import IterableBase from './IterableBase.js';

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
class ReadOnlyIterableCollectionBase extends IterableBase {
    constructor() {
        super();
    }
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
    map(selector) {
        if (!selector)
            throw new ArgumentNullException('selector');
        return ExtendedIterable.create(super.map(selector));
    }
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
    copyTo(target, index = 0) {
        return copyIterableTo(this, target, index);
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
class ExtendedIterable extends ReadOnlyIterableCollectionBase {
    _source;
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

export { ExtendedIterable, ReadOnlyIterableCollectionBase as default };
//# sourceMappingURL=ReadOnlyIterableCollectionBase.js.map
