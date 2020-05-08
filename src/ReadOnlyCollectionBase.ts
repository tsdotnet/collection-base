/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import {areEqual, EqualityComparison} from '@tsdotnet/compare';
import ReadOnlyCollection from './ReadOnlyCollection';
import IterableCollectionBase from './IterableCollectionBase';

export default abstract class ReadOnlyCollectionBase<T>
	extends IterableCollectionBase<T>
	implements ReadOnlyCollection<T>
{
	protected constructor (
		protected _equalityComparer: EqualityComparison<T> = areEqual)
	{
		super();
	}

	/**
	 * Returns the current number of entries.
	 * @returns {number}
	 */
	get count (): number
	{
		return this.getCount();
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
}
