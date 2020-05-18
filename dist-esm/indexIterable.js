/**
 * @packageDocumentation
 * @module collection-base
 */
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
/**
 * Returns an iterable that iterates an `ArrayLike` object by index.
 * @param {ArrayLike<T>} source
 * @return {Iterable<T>}
 */
export default function indexIterable(source) {
    return {
        *[Symbol.iterator]() {
            const len = source === null || source === void 0 ? void 0 : source.length;
            if (len) {
                for (let i = 0; i < len; i++) {
                    yield source[i];
                }
            }
        }
    };
}
//# sourceMappingURL=indexIterable.js.map