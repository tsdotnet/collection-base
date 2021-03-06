
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

/**
 * Returns an iterable that iterates an `ArrayLike` object by index.
 * @param {ArrayLike<T>} source
 * @return {Iterable<T>}
 */
export default function indexIterable<T> (source: ArrayLike<T>): Iterable<T> {
	return {
		* [Symbol.iterator] (): Iterator<T>
		{
			const len = source?.length;
			if(len)
			{
				for(let i = 0; i<len; i++)
				{
					yield source[i];
				}
			}
		}
	};
}
