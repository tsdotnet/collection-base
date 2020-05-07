/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
import ArgumentNullException from '@tsdotnet/exceptions/dist/ArgumentNullException';
import InvalidOperationException from '@tsdotnet/exceptions/dist/InvalidOperationException';
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
        if (index >= target.length)
            throw new InvalidOperationException('\'target\' is not large enough to accept the results of copying.');
        target[index++] = e;
    }
    return target;
}
//# sourceMappingURL=copyIterableTo.js.map