/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import {PredicateWithIndex} from '@tsdotnet/common-interfaces';
import {areEqual, EqualityComparison} from '@tsdotnet/compare';
import ReadOnlyCollectionBase from './ReadOnlyCollectionBase';
import ArgumentNullException from '@tsdotnet/exceptions/dist/ArgumentNullException';
import Collection from './Collection';

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-this-alias */

export default abstract class CollectionBase<T>
	extends ReadOnlyCollectionBase<T>
	implements Collection<T>
{
	private _count: number = 0;

	protected constructor (
		initialValues?: Iterable<T>,
		equalityComparer: EqualityComparison<T> = areEqual)
	{
		super(equalityComparer);
		if(initialValues) this.addEntries(initialValues);
	}

	/**
	 * Returns the current number of entries.
	 * @returns {number}
	 */
	getCount (): number
	{
		return this._count;
	}

	/**
	 * Adds an entry to the collection.
	 * @param entry
	 */
	add (entry: T): this
	{
		if(this._addInternal(entry))
		{
			this._count++;
			this._incrementVersion();
		}
		return this;
	}

	/**
	 * Removes entries from the collection allowing for a limit.
	 * For example if the collection not a distinct set, more than one entry could be removed.
	 * @param entry The entry to remove.
	 * @param max Limit of entries to remove.  Will remove all matches if no max specified.
	 * @returns {number} The number of entries removed.
	 */
	remove (entry: T, max: number = Infinity): number
	{
		const n = this._removeInternal(entry, max);
		if(n)
		{
			this._count -= n;
			this._incrementVersion();
		}
		return n;
	}

	/**
	 * Clears the contents of the collection resulting in a count of zero.
	 * @returns {number}
	 */
	clear (): number
	{
		const n = this._clearInternal();
		if(n) this._incrementVersion();
		this._count = 0;
		return n;
	}

	/**
	 * Safely imports the contents of an iterable.
	 * @param entries
	 * @returns {number}
	 */
	addEntries (entries: Iterable<T>): number
	{
		if(!entries) return 0;
		const n = this._addEntries(entries);
		if(n)
		{
			this._count += n;
			this._incrementVersion();
		}
		return n;
	}

	/**
	 * Returns an iterable filtered by the provided predicate.
	 * @param predicate
	 * @returns {[]}
	 */
	* filter (predicate: PredicateWithIndex<T>): Iterable<T>
	{
		if(!predicate) throw new ArgumentNullException('predicate');
		let i = 0;
		for(const e of this)
		{
			if(predicate(e, i++))
				yield e;
		}
	}

	public dispose (): void
	{
		this.clear();
	}

	protected abstract _addInternal (entry: T): boolean;

	protected abstract _removeInternal (entry: T, max?: number): number;

	protected abstract _clearInternal (): number;

	protected _addEntries (entries: Iterable<T> | null | undefined): number
	{
		let added = 0;
		if(entries)
		{
			for(const e of entries)
			{
				if(this._addInternal(e)) added++;
			}
		}
		return added;
	}
}
