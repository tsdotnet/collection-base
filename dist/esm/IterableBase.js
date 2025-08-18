import { ArgumentNullException } from '@tsdotnet/exceptions';

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
class IterableBase {
    constructor() { }
    [Symbol.iterator]() {
        return this._getIterator();
    }
    map(selector) {
        if (!selector)
            throw new ArgumentNullException('selector');
        const _ = this;
        return {
            *[Symbol.iterator]() {
                let i = 0;
                for (const e of _)
                    yield selector(e, i++);
            }
        };
    }
}

export { IterableBase as default };
//# sourceMappingURL=IterableBase.js.map
