/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */


import ReadOnlyCollection from './ReadOnlyCollection';

export default interface Collection<T>
	extends ReadOnlyCollection<T>
{
	add (entry: T): this;

	addEntries (entries: Iterable<T>): number;

	remove (entry: T, max?: number): number;  // Number of times removed.
	clear (): number;
}
