/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

export default function iterateArrayLike<T> (source: ArrayLike<T>): Iterable<T> {
	if(source instanceof Array) return source;
	return iterateIndexes(source);
}

export function* iterateIndexes<T> (source: ArrayLike<T>): Iterable<T>
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
