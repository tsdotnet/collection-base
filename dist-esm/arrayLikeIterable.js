/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
export default function arrayLikeIterable(source) {
    if (source instanceof Array)
        return source;
    return indexIterable(source);
}
export function* indexIterable(source) {
    const len = source === null || source === void 0 ? void 0 : source.length;
    if (len) {
        for (let i = 0; i < len; i++) {
            yield source[i];
        }
    }
}
//# sourceMappingURL=arrayLikeIterable.js.map