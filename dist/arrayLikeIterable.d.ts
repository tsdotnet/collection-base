/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
/**
 * Ensures an iterable from an `ArrayLike` object.
 * If is an instance of an Array, will return the array directly.
 * @param {ArrayLike<T>} source
 * @return {Iterable<T>}
 */
export default function arrayLikeIterable<T>(source: ArrayLike<T>): Iterable<T>;
