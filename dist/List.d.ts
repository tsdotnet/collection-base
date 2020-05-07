/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import Collection from './Collection';
import ReadOnlyList from './ReadOnlyList';

export default interface List<T>
	extends Collection<T>, ReadOnlyList<T>
{
	set (index: number, value: T): boolean;

	insert (index: number, value: T): void;

	removeAt (index: number): boolean;
}
