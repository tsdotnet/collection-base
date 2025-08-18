/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { EqualityComparison } from '@tsdotnet/compare';
import Collection from './Collection';
import ReadOnlyCollectionBase from './ReadOnlyCollectionBase';
export default abstract class CollectionBase<T> extends ReadOnlyCollectionBase<T> implements Collection<T> {
    private _count;
    protected constructor(equalityComparer?: EqualityComparison<T>);
    getCount(): number;
    add(entry: T): this;
    remove(entry: T, max?: number): number;
    clear(): number;
    addEntries(entries: Iterable<T>): number;
    dispose(): void;
    protected abstract _addInternal(entry: T): boolean;
    protected abstract _removeInternal(entry: T, max?: number): number;
    protected abstract _clearInternal(): number;
    protected _addEntries(entries: Iterable<T> | null | undefined): number;
}
