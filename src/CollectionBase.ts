/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import Collection from './Collection';
import {areEqual, EqualityComparison} from '@tsdotnet/compare';
import ReadOnlyCollectionBase from './ReadOnlyCollectionBase';
import ArgumentNullException from '@tsdotnet/exceptions/dist/ArgumentNullException';
import Predicate from './Predicate';

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-this-alias */

export abstract class CollectionBase<T>
	extends ReadOnlyCollectionBase<T>
	implements Collection<T>
{

	protected constructor (
		source?: Iterable<T>,
		equalityComparer: EqualityComparison<T> = areEqual)
	{
		super(equalityComparer);
		this._importEntries(source);
	}

	/**
	 * Adds an entry to the collection.
	 * @param entry
	 */
	add (entry: T): this
	{
		if(this._addInternal(entry)) this._version++;
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
		if(n) this._version++;
		return n;
	}

	/**
	 * Clears the contents of the collection resulting in a count of zero.
	 * @returns {number}
	 */
	clear (): number
	{
		const n = this._clearInternal();
		if(n) this._version++;
		return n;
	}

	/**
	 * Safely imports the contents of an iterable.
	 * @param entries
	 * @returns {number}
	 */
	importEntries (entries: Iterable<T>): number
	{
		if(!entries) return 0;
		const n = this._importEntries(entries);
		if(n) this._version++;
		return n;
	}

	/**
	 * Returns an iterable filtered by the provided predicate.
	 * @param predicate
	 * @returns {[]}
	 */
	* filter (predicate: Predicate<T>): Iterable<T>
	{
		if(!predicate) throw new ArgumentNullException('predicate');
		let i = 0;
		for(const e of this)
		{
			if(predicate(e, i++))
				yield e;
		}
	}


	protected abstract _addInternal (entry: T): boolean;

	protected abstract _removeInternal (entry: T, max?: number): number;

	protected abstract _clearInternal (): number;

	public dispose (): void
	{
		this.clear();
	}

	protected _importEntries (entries: Iterable<T> | null | undefined): number
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

export default CollectionBase;
