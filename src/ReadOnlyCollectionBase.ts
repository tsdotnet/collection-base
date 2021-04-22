
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import areEqual from '@tsdotnet/compare/dist/areEqual';
import {EqualityComparison} from '@tsdotnet/compare/dist/Comparable';
import IterableCollectionBase from './IterableCollectionBase';
import ReadOnlyCollection from './ReadOnlyCollection';

/**
 * Base class for implementing an internally modifiable, eternally read-only collection.
 */
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
