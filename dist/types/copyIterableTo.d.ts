/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { ArrayLikeWritable } from '@tsdotnet/common-interfaces';
export default function copyIterableTo<T, TTarget extends ArrayLikeWritable<T>>(source: Iterable<T>, target: TTarget, index?: number): TTarget;
