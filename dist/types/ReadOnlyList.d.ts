
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import ReadOnlyCollection from './ReadOnlyCollection';

export default interface ReadOnlyList<T>
	extends ReadOnlyCollection<T>
{
	get (index: number): T;

	indexOf (item: T): number;
	// eslint-disable-next-line semi
}
