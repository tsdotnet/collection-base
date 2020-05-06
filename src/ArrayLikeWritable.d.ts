/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

export default interface ArrayLikeWritable<T>
{
	length: number;

	[n: number]: T;
}
