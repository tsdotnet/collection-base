import indexIterable from './indexIterable.js';

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
function arrayLikeIterable(source) {
    if (source instanceof Array)
        return source;
    return indexIterable(source);
}

export { arrayLikeIterable as default };
//# sourceMappingURL=arrayLikeIterable.js.map
