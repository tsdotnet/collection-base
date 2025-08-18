/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
function indexIterable(source) {
    return {
        *[Symbol.iterator]() {
            const len = source?.length;
            if (len) {
                for (let i = 0; i < len; i++) {
                    yield source[i];
                }
            }
        }
    };
}

export { indexIterable as default };
//# sourceMappingURL=indexIterable.js.map
