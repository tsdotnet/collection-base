import { ArgumentNullException } from '@tsdotnet/exceptions';

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
function copyIterableTo(source, target, index = 0) {
    if (!target)
        throw new ArgumentNullException('target');
    for (const e of source) {
        target[index++] = e;
    }
    return target;
}

export { copyIterableTo as default };
//# sourceMappingURL=copyIterableTo.js.map
