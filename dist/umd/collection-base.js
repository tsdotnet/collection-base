(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tsdotnet/compare'), require('@tsdotnet/exceptions')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tsdotnet/compare', '@tsdotnet/exceptions'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.tsdotnet = global.tsdotnet || {}, global.tsdotnet.collectionBase = global.tsdotnet.collectionBase || {}), global.tsdotnet.compare, global.tsdotnet.exceptions));
})(this, (function (exports, compare, exceptions) { 'use strict';

    /*!
     * @author electricessence / https://github.com/electricessence/
     * @license MIT
     */
    function indexIterable(source) {
        return {
            *[Symbol.iterator]() {
                const len = source?.length;
                if (len) {
                    for (let i = 0; i < len; i++) {
                        yield source[i];
                    }
                }
            }
        };
    }

    /*!
     * @author electricessence / https://github.com/electricessence/
     * @license MIT
     */
    function arrayLikeIterable(source) {
        if (source instanceof Array)
            return source;
        return indexIterable(source);
    }

    /*!
     * @author electricessence / https://github.com/electricessence/
     * @license MIT
     */
    function copyIterableTo(source, target, index = 0) {
        if (!target)
            throw new exceptions.ArgumentNullException('target');
        for (const e of source) {
            target[index++] = e;
        }
        return target;
    }

    /*!
     * @author electricessence / https://github.com/electricessence/
     * @license MIT
     */
    class IterableBase {
        constructor() { }
        [Symbol.iterator]() {
            return this._getIterator();
        }
        map(selector) {
            if (!selector)
                throw new exceptions.ArgumentNullException('selector');
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
                throw new exceptions.ArgumentNullException('predicate');
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
                throw new exceptions.ArgumentNullException('selector');
            return ExtendedIterable.create(super.map(selector));
        }
        reduce(reducer, initialValue) {
            if (!reducer)
                throw new exceptions.ArgumentNullException('reducer');
            let i = 0;
            if (initialValue === undefined) {
                const iterator = this[Symbol.iterator]();
                let n = iterator.next();
                if (n.done)
                    throw new exceptions.InvalidOperationException('Sequence is empty.  Specify an initial value allow for an empty iterable.');
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

    /*!
     * @author electricessence / https://github.com/electricessence/
     * @license MIT
     */
    class IterableCollectionBase extends ReadOnlyIterableCollectionBase {
        constructor() {
            super();
        }
        _version;
        get version() {
            return this._version || 0 | 0;
        }
        assertVersion(version) {
            if (version !== this.version)
                throw new exceptions.InvalidOperationException('Version mismatch. The collection was modified.');
            return true;
        }
        *[Symbol.iterator]() {
            const version = this.version;
            const i = this._getIterator();
            let n = i.next();
            while (!n.done) {
                yield n.value;
                this.assertVersion(version);
                n = i.next();
            }
        }
        incrementVersion() {
            if (this._version)
                return ++this._version;
            return this._version = 1 | 0;
        }
    }

    /*!
     * @author electricessence / https://github.com/electricessence/
     * @license MIT
     */
    class ReadOnlyCollectionBase extends IterableCollectionBase {
        _equalityComparer;
        constructor(_equalityComparer = compare.areEqual) {
            super();
            this._equalityComparer = _equalityComparer;
        }
        get count() {
            return this.getCount();
        }
        contains(entry) {
            for (const e of this) {
                if (this._equalityComparer(e, entry))
                    return true;
            }
            return false;
        }
    }

    /*!
     * @author electricessence / https://github.com/electricessence/
     * @license MIT
     */
    class CollectionBase extends ReadOnlyCollectionBase {
        _count = 0;
        constructor(equalityComparer = compare.areEqual) {
            super(equalityComparer);
        }
        getCount() {
            return this._count;
        }
        add(entry) {
            if (this._addInternal(entry)) {
                this._count++;
                this.incrementVersion();
            }
            return this;
        }
        remove(entry, max = Infinity) {
            const n = this._removeInternal(entry, max);
            if (n) {
                this._count -= n;
                this.incrementVersion();
            }
            return n;
        }
        clear() {
            const n = this._clearInternal();
            if (n)
                this.incrementVersion();
            this._count = 0;
            return n;
        }
        addEntries(entries) {
            if (!entries)
                return 0;
            const n = this._addEntries(entries);
            if (n) {
                this._count += n;
                this.incrementVersion();
            }
            return n;
        }
        dispose() {
            this.clear();
        }
        _addEntries(entries) {
            let added = 0;
            if (entries) {
                for (const e of entries) {
                    if (this._addInternal(e))
                        added++;
                }
            }
            return added;
        }
    }

    exports.CollectionBase = CollectionBase;
    exports.ExtendedIterable = ExtendedIterable;
    exports.IterableBase = IterableBase;
    exports.IterableCollectionBase = IterableCollectionBase;
    exports.ReadOnlyCollectionBase = ReadOnlyCollectionBase;
    exports.ReadOnlyIterableCollectionBase = ReadOnlyIterableCollectionBase;
    exports.arrayLikeIterable = arrayLikeIterable;
    exports.copyIterableTo = copyIterableTo;
    exports.indexIterable = indexIterable;

}));
//# sourceMappingURL=collection-base.js.map
