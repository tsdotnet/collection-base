/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import ReadOnlyIterableCollectionBase from './ReadOnlyIterableCollectionBase';
export default abstract class IterableCollectionBase<T> extends ReadOnlyIterableCollectionBase<T> {
    protected constructor();
    private _version?;
    get version(): number;
    assertVersion(version: number): true | never;
    [Symbol.iterator](): Iterator<T>;
    incrementVersion(): number;
}
