/**
 * @packageDocumentation
 * @module collection-base
 */
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import ReadOnlyCollection from './ReadOnlyCollection';

/**
 * Interface for implementing an externally modifiable collection.
 */
export default interface Collection<T>
	extends ReadOnlyCollection<T>
{
	add (entry: T): this;

	addEntries (entries: Iterable<T>): number;

	remove (entry: T, max?: number): number;  // Number of times removed.
	clear (): number;
}
