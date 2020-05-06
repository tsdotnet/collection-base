/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */


import ReadOnlyCollection from './ReadOnlyCollection';
import ArrayLikeWritable from './ArrayLikeWritable';
import ArgumentNullException from '@tsdotnet/exceptions/dist/ArgumentNullException';
import {areEqual} from '@tsdotnet/compare';

export default abstract class ReadOnlyCollectionBase<T>
	implements ReadOnlyCollection<T>
{
	get count (): number { return this.getCount(); }

	abstract [Symbol.iterator] (): Iterator<T>

	contains (entry: T): boolean
	{
		for(const e of this)
		{
			if(areEqual(e, entry)) return true;
		}
		return false;
	}

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

	toArray (): T[]
	{
		return this.copyTo([]);
	}

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
