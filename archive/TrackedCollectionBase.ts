/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import {areEqual, EqualityComparison} from '@tsdotnet/compare';
import CollectionBase from '../src/CollectionBase';

/* eslint-disable @typescript-eslint/no-this-alias */

/**
 * A base class for building collections with modification tracking.
 */
export abstract class TrackedCollectionBase<T>
	extends CollectionBase<T>
{

	/*
	 * Note: Avoid changing modified count by any means but ++;
	 * If setting modified count by the result of a closure it may be a negative number or NaN and ruin the pattern.
	 */
	private _modifiedCount: number = 0;
	private _updateRecursion: number = 0;

	protected constructor (
		source?: Iterable<T>,
		equalityComparer: EqualityComparison<T> = areEqual)
	{
		super(source, equalityComparer);
		this._importEntries(source);
	}

	get isUpdating (): boolean { return this._updateRecursion!=0; }

	/**
	 * Takes a closure that if returning true will propagate an update signal.
	 * Multiple update operations can be occurring at once or recursively and the onModified signal will only occur once they're done.
	 * @param closure
	 * @returns {boolean}
	 */
	handleUpdate (closure?: () => boolean): boolean
	{
		if(!closure) return false;
		const _ = this;
		_._updateRecursion++;
		let updated: boolean = false;

		try
		{
			updated = closure();
			if(updated)
				_._modifiedCount++;
		}
		finally
		{
			_._updateRecursion--;
		}

		_._signalModification();

		return updated;
	}

	/**
	 * Adds an entry to the collection.
	 * @param entry
	 */
	add (entry: T): this
	{
		const _ = this;
		_._updateRecursion++;

		try
		{ if(_._addInternal(entry)) _._modifiedCount++; }
		finally
		{ _._updateRecursion--; }

		_._signalModification();

		return _;
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
		const _ = this;
		_._updateRecursion++;

		let n: number = NaN;
		try
		{
			n = _._removeInternal(entry, max);
			if(n) _._modifiedCount++;
		}
		finally
		{ _._updateRecursion--; }

		_._signalModification();
		return n;
	}

	/**
	 * Clears the contents of the collection resulting in a count of zero.
	 * @returns {number}
	 */
	clear (): number
	{
		const _ = this;
		_._updateRecursion++;

		let n: number = NaN;
		try
		{
			n = _._clearInternal();
			if(n) _._modifiedCount++;
		}
		finally
		{ _._updateRecursion--; }

		_._signalModification();

		return n;
	}

	/**
	 * Safely imports the contents of an iterable.
	 * @param entries
	 * @returns {number}
	 */
	importEntries (entries: Iterable<T>): number
	{
		const _ = this;
		if(!entries) return 0;
		_._updateRecursion++;

		let n: number = NaN;
		try
		{
			n = _._importEntries(entries);
			if(n) _._modifiedCount++;
		}
		finally
		{ _._updateRecursion--; }

		_._signalModification();
		return n;
	}


	// eslint-disable-next-line @typescript-eslint/no-empty-function
	protected _onModified (): void {}

	protected _signalModification (increment?: boolean): boolean
	{
		const _ = this;
		if(increment) _._modifiedCount++;
		if(_._modifiedCount && !this._updateRecursion)
		{
			_._modifiedCount = 0;
			_._version++;
			try
			{
				_._onModified();
			}
			catch(ex)
			{
				// Avoid fatal errors which may have been caused by consumer.
				console.error(ex);
			}
			return true;
		}
		return false;
	}

	protected _incrementModified (): void { this._modifiedCount++; }

}

export default CollectionBase;
