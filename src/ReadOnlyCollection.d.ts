/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import ArrayLikeWritable from './ArrayLikeWritable';


export default interface ReadOnlyCollection<T>
	extends Iterable<T>
{
	count: number;

	contains (entry: T): boolean;

	copyTo<T> (target: T[], index?: number): T[];

	copyTo<TTarget extends ArrayLikeWritable<any>> (target: TTarget, index?: number): TTarget;

	toArray (): T[];
}
