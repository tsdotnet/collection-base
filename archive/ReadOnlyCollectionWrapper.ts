/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import ReadOnlyCollectionBase from './ReadOnlyCollectionBase';
import type from '@tsdotnet/compare/dist/type';
import ArgumentNullException from '@tsdotnet/exceptions/dist/ArgumentNullException';
import ReadOnlyCollection from '@tsdotnet/collection-base/dist/ReadOnlyCollection';
import arrayLikeIterable from '../src/arrayLikeIterable';


export default class ReadOnlyCollectionWrapper<T>
	extends ReadOnlyCollectionBase<T>
{
	private readonly __getCount: () => number;
	private readonly __getIterator: () => Iterator<T>;

	constructor (collection: ReadOnlyCollection<T> | ArrayLike<T>)
	{
		super();

		if(!collection)
			throw new ArgumentNullException('collection');

		if(type.isArrayLike(collection))
		{
			this.__getCount = () => collection.length;
			this.__getIterator = arrayLikeIterable(collection)[Symbol.iterator];
		}
		else
		{
			this.__getCount = () => collection.count;
			this.__getIterator = collection[Symbol.iterator];
		}
	}

	getCount (): number
	{
		return this.__getCount();
	}

	protected _getIterator (): Iterator<T>
	{
		return this.__getIterator();
	}

}
