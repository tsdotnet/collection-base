/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { ArgumentNullException } from '@tsdotnet/exceptions';
/**
 * Copies all values to a numerically indexable object.
 * @param {Iterable} source
 * @param target
 * @param {number?} index
 * @returns target
 */
export default function copyIterableTo(source, target, index = 0) {
    if (!target)
        throw new ArgumentNullException('target');
    for (const e of source) {
        target[index++] = e;
    }
    return target;
}
//# sourceMappingURL=copyIterableTo.js.map