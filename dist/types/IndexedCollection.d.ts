
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import Collection from './Collection.js';
import ReadOnlyList from './ReadOnlyList.js';

/**
 * Interface for implementing an indexable collection.
 */
export default interface IndexedCollection<T>
	extends Collection<T>, ReadOnlyList<T>
{
	set (index: number, value: T): boolean;

	insert (index: number, value: T): void;

	removeAt (index: number): boolean;
	// eslint-disable-next-line semi
}
