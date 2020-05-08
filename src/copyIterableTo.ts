/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import {ArrayLikeWritable} from '@tsdotnet/common-interfaces';
import ArgumentNullException from '@tsdotnet/exceptions/dist/ArgumentNullException';

/**
 * Copies all values to a numerically indexable object.
 * @param {Iterable} source
 * @param target
 * @param {number?} index
 * @returns target
 */
export default function copyIterableTo<T, TTarget extends ArrayLikeWritable<T>> (
	source: Iterable<T>,
	target: TTarget,
	index: number = 0): TTarget {
	if(!target) throw new ArgumentNullException('target');

	for(const e of source)
	{
		target[index++] = e;
	}
	return target;
}
