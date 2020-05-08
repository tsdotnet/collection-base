/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

export default function arrayLikeIterable<T> (source: ArrayLike<T>): Iterable<T> {
	if(source instanceof Array) return source;
	return indexIterable(source);
}

export function* indexIterable<T> (source: ArrayLike<T>): Iterable<T>
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
