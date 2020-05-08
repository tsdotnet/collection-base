/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import {ArrayLikeWritable} from '@tsdotnet/common-interfaces';
import {InvalidOperationException} from '@tsdotnet/exceptions';
import copyIterableTo from './copyIterableTo';

export default abstract class IterableCollectionBase<T>
{
	private _version: number = 0; // Provides an easy means of tracking changes and invalidating enumerables.

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	protected constructor () { /* make protected */ }

	/**
	 * The version number used to track changes.
	 * @returns {number}
	 */
	get version (): number
	{
		return this._version;
	}

	/**
	 * Throws if the provided version does not match the current one.
	 * @param {number} version
	 * @returns {boolean}
	 */
	assertVersion (version: number): true | never
	{
		if(version!==this._version)
			throw new InvalidOperationException('Version mismatch. The collection was modified.');
		return true;
	}

	* [Symbol.iterator] (): Iterator<T>
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
	 * Copies all values to a numerically indexable object.
	 * @param {TTarget} target
	 * @param {number} index
	 * @returns {TTarget}
	 */
	copyTo<TTarget extends ArrayLikeWritable<T>> (target: TTarget, index: number = 0): TTarget
	{
		return copyIterableTo(this, target, index);
	}

	/**
	 * Creates a copy of the contents as an array.
	 * @returns {[]}
	 */
	toArray (): T[]
	{
		return this.copyTo([]);
	}

	/**
	 * Returns the number of items contained in the collection by iterating the contents.
	 * @returns {number}
	 */
	getCount (): number
	{
		let count = 0;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for(const _ of this)
		{
			count++;
		}
		return count;
	}

	/**
	 * Increments the collection version.
	 * Useful for tracking changes.
	 * @return {number} The new version.
	 */
	incrementVersion (): number
	{
		return ++this._version;
	}

	/**
	 * Override to define the actual iterator.
	 * The [Symbol.iterator] should not be overridden as it handles version tracking.
	 * @returns {Iterator}
	 * @private
	 */
	protected abstract _getIterator (): Iterator<T>;
}
