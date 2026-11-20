/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { SelectorWithIndex } from '@tsdotnet/common-interfaces';
export default abstract class IterableBase<T> implements Iterable<T> {
    protected constructor();
    [Symbol.iterator](): Iterator<T>;
    map<TResult>(selector: SelectorWithIndex<T, TResult>): Iterable<TResult>;
    protected abstract _getIterator(): Iterator<T>;
}
