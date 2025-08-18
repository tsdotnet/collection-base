/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { ArrayLikeWritable, PredicateWithIndex, SelectorWithIndex } from '@tsdotnet/common-interfaces';
import IterableBase from './IterableBase';
export default abstract class ReadOnlyIterableCollectionBase<T> extends IterableBase<T> {
    protected constructor();
    filter(predicate: PredicateWithIndex<T>): ExtendedIterable<T>;
    map<TResult>(selector: SelectorWithIndex<T, TResult>): ExtendedIterable<TResult>;
    reduce<T>(reduction: (previous: T, current: T, index: number) => T): T;
    reduce<T, U>(reduction: (previous: U, current: T, index: number) => U, initialValue: U): U;
    copyTo<TTarget extends ArrayLikeWritable<T>>(target: TTarget, index?: number): TTarget;
    toArray(): T[];
    getCount(): number;
}
export declare class ExtendedIterable<T> extends ReadOnlyIterableCollectionBase<T> {
    private _source;
    protected constructor(_source: Iterable<T>);
    static create<T>(source: Iterable<T>): ExtendedIterable<T>;
    protected _getIterator(): Iterator<T>;
}
