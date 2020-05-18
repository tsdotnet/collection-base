/**
 * @packageDocumentation
 * @module collection-base
 */
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import InvalidOperationException from '@tsdotnet/exceptions/dist/InvalidOperationException';
import ReadOnlyIterableCollectionBase from './ReadOnlyIterableCollectionBase';

/**
 * Base class for implementing an iterable (finite) collection.
 */
export default abstract class IterableCollectionBase<T>
	extends ReadOnlyIterableCollectionBase<T>
{
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	protected constructor ()
	{
		super();
	}

	private _version: number = 0; // Provides an easy means of tracking changes and invalidating enumerables.

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
		const version = this.version; // since version can be overridden, be sure to use public.
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
	 * Increments the collection version.
	 * Useful for tracking changes.
	 * @return {number} The new version.
	 */
	incrementVersion (): number
	{
		return ++this._version;
	}
}
