/**
 * @packageDocumentation
 * @module collection-base
 */
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { ArrayLikeWritable } from '@tsdotnet/common-interfaces';
/**
 * Copies all values to a numerically indexable object.
 * @param {Iterable} source
 * @param target
 * @param {number?} index
 * @returns target
 */
export default function copyIterableTo<T, TTarget extends ArrayLikeWritable<T>>(source: Iterable<T>, target: TTarget, index?: number): TTarget;
