/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import IterableCollectionBase from './IterableCollectionBase';

export default interface ReadOnlyCollection<T>
	extends IterableCollectionBase<T>
{
	count: number;

	contains (entry: T): boolean;
}
