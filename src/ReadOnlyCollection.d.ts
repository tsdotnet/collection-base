/**
 * @packageDocumentation
 * @module collection-base
 */
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import IterableCollectionBase from './IterableCollectionBase';

/**
 * Interface for implementing a finite read-only collection.
 */
export default interface ReadOnlyCollection<T>
	extends IterableCollectionBase<T>
{
	count: number;

	contains (entry: T): boolean;
}
