/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { EqualityComparison } from '@tsdotnet/compare';
import IterableCollectionBase from './IterableCollectionBase';
import ReadOnlyCollection from './ReadOnlyCollection';
export default abstract class ReadOnlyCollectionBase<T> extends IterableCollectionBase<T> implements ReadOnlyCollection<T> {
    protected _equalityComparer: EqualityComparison<T>;
    protected constructor(_equalityComparer?: EqualityComparison<T>);
    get count(): number;
    contains(entry: T): boolean;
}
