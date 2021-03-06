/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import indexIterable from './indexIterable';
/**
 * Ensures an iterable from an `ArrayLike` object.
 * If is an instance of an Array, will return the array directly.
 * @param {ArrayLike<T>} source
 * @return {Iterable<T>}
 */
export default function arrayLikeIterable(source) {
    if (source instanceof Array)
        return source;
    return indexIterable(source);
}
//# sourceMappingURL=arrayLikeIterable.js.map