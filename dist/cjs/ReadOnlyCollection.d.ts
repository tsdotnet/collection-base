
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import IterableCollectionBase from './IterableCollectionBase.js';

/**
 * Interface for implementing a finite read-only collection.
 */
export default interface ReadOnlyCollection<T>
	extends IterableCollectionBase<T>
{
	count: number;

	contains (entry: T): boolean;
	// eslint-disable-next-line semi
}
