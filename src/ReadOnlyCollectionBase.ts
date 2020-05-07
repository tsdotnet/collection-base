/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import ReadOnlyCollection from './ReadOnlyCollection';
import ArrayLikeWritable from './ArrayLikeWritable';
import ArgumentNullException from '@tsdotnet/exceptions/dist/ArgumentNullException';
import {areEqual, EqualityComparison} from '@tsdotnet/compare';
import {InvalidOperationException} from '@tsdotnet/exceptions';

export default abstract class ReadOnlyCollectionBase<T>
	implements ReadOnlyCollection<T>
{
	protected _version: number = 0; // Provides an easy means of tracking changes and invalidating enumerables.

	protected constructor (
		protected _equalityComparer: EqualityComparison<T> = areEqual)
	{
	}

	/**
	 * Returns the number of entries contained..
	 * @returns {number}
	 */
	get count (): number
	{ return this.getCount(); }

	[Symbol.iterator] (): Iterator<T>
	{
		return this.getIterator();
	}

	/**
	 * Returns an iterator for this collection.
	 * @returns {Iterator}
	 */
	* getIterator (): Iterator<T>
	{
		const version = this._version;
		const i = this._getIterator();
		let n = i.next();
		while(!n.done)
		{
			yield n.value;
			this.assertVersion(version);
			n = i.next();
		}
	}

	/**
	 * Returns true if the equality comparer resolves true on any element in the collection.
	 * @param entry
	 * @returns {boolean}
	 */
	contains (entry: T): boolean
	{
		for(const e of this)
		{
			if(this._equalityComparer(e, entry)) return true;
		}
		return false;
	}

	/**
	 * Copies all values to numerically indexable object.
	 * @param {TTarget} target
	 * @param {number} index
	 * @returns {TTarget}
	 */
	copyTo<TTarget extends ArrayLikeWritable<any>> (target: TTarget, index: number = 0): TTarget
	{
		if(!target) throw new ArgumentNullException('target');

		for(const e of this)
		{
			if(index>=target.length) throw new Error('Target is not large enough to accept the results of copying.');
			target[index++] = e;
		}
		return target;
	}

	/**
	 * Creates a copy of the contents as an array.
	 * @returns {[]}
	 */
	toArray (): T[]
	{
		return this.copyTo([]);
	}

	protected _incrementVersion (): void
	{
		++this._version;
	}

	protected assertVersion (version: number): true | never
	{
		if(version!==this._version)
			throw new InvalidOperationException('Collection was modified.');

		return true;
	}

	protected abstract _getIterator (): Iterator<T>;

	protected getCount (): number
	{
		let count = 0;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for(const _ of this)
		{
			count++;
		}
		return count;
	}


}
