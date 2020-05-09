/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import {contains, remove, removeIndex, indexOf} from '@tsdotnet/array-utility'

import IndexedCollection from '../src/IndexedCollection'
import { EqualityComparison } from '@tsdotnet/compare/dist/Comparison';
import { areEqual } from '@tsdotnet/compare/dist/compare';
import CollectionBase from '../src/CollectionBase';

export default class List<T>
	extends CollectionBase<T>
	implements IndexedCollection<T>
{
	protected readonly _source: T[];

	constructor (
		initialValues?: Iterable<T>,
		equalityComparer: EqualityComparison<T> = areEqual)
	{
		super(equalityComparer);
		if(initialValues instanceof Array)
		{
			this._source = initialValues.slice();
		}
		else
		{
			this._source = [];
			this._addEntries(initialValues);
		}
	}

	protected _getIterator(): Iterator<T> {
		return this._source[Symbol.iterator]();
	}

	get (index: number): T
	{
		return this._source[index];
	}

	set (index: number, value: T): boolean
	{
		const s = this._source;
		if(index<s.length && areEqual(value, s[index]))
			return false;

		s[index] = value;
		this.incrementVersion();
		return true;
	}

	indexOf (item: T): number
	{
		return indexOf(
			this._source, item,
			this._equalityComparer);
	}

	insert (index: number, value: T): void
	{
		const s = this._source;
		if(index<s.length) this._source.splice(index, 0, value);
		else this._source[index] = value;
		this.incrementVersion();
	}

	removeAt (index: number): boolean
	{
		if(removeIndex(this._source, index))
		{
			this.incrementVersion();
			return true;
		}
		return false;
	}

	contains (item: T): boolean
	{
		return contains(
			this._source, item,
			this._equalityComparer);
	}

	/**
	 * Sorts the underlying array.
	 * @param compareFn The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order.
	 */
	sort (compareFn?: (a: T, b: T) => number): this
	{
		this._source.sort(compareFn);
		return this;
	}

	getCount (): number
	{
		return this._source.length;
	}

	protected _addInternal (entry: T): boolean
	{
		this._source.push(entry);
		return true;
	}

	protected _removeInternal (entry: T, max: number = Infinity): number
	{
		return remove(
			this._source, entry, max,
			this._equalityComparer);
	}

	protected _clearInternal (): number
	{
		const len = this._source.length;
		this._source.length = 0;
		return len;
	}
}
