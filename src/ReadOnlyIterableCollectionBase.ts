
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import {
	ArrayLikeWritable,
	PredicateWithIndex,
	SelectorWithIndex
} from '@tsdotnet/common-interfaces';
import ArgumentNullException from '@tsdotnet/exceptions/dist/ArgumentNullException';
import InvalidOperationException from '@tsdotnet/exceptions/dist/InvalidOperationException';
import copyIterableTo from './copyIterableTo';
import IterableBase from './IterableBase';

/**
 * Base class for implementing finite read-only iterables.
 */
export default abstract class ReadOnlyIterableCollectionBase<T>
	extends IterableBase<T>
{
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	protected constructor ()
	{
		super();
	}

	/**
	 * Returns an iterable filtered by the provided predicate.
	 * @param {PredicateWithIndex<T>} predicate
	 * @return {Iterable<T>}
	 */
	filter (predicate: PredicateWithIndex<T>): ExtendedIterable<T>
	{
		if(!predicate) throw new ArgumentNullException('predicate');
		const _ = this;
		return ExtendedIterable.create({
			* [Symbol.iterator] (): Iterator<T>
			{
				let i = 0;
				for(const e of _) if(predicate(e, i++)) yield e;
			}
		});
	}

	/**
	 * Returns an iterable mapped by the provided selector.
	 * @param {SelectorWithIndex<T, TResult>} selector
	 * @return {Iterable<TResult>}
	 */
	map<TResult> (selector: SelectorWithIndex<T, TResult>): ExtendedIterable<TResult>
	{
		if(!selector) throw new ArgumentNullException('selector');
		return ExtendedIterable.create(super.map(selector));
	}


	/**
	 * Applies a reducer function to all the elements in this sequence.
	 * The first entry is used as the initial accumulator value, and the specified function is used to select the result value.
	 * @throws If the sequence is empty.
	 * @param {(previous: (T | undefined), current: T, index: number) => T} reduction
	 * @return {IterableTransform<T, T | undefined>}
	 */
	reduce<T> (reduction: (previous: T, current: T, index: number) => T): T;

	/**
	 * Applies a reducer function to all the elements in this sequence.
	 * The specified seed value is used as the initial accumulator value, and the specified function is used to select the result value.
	 * @param {(previous: U, current: T, index: number) => U} reduction
	 * @param {U} initialValue
	 * @return {IterableTransform<T, U>}
	 */
	reduce<T, U> (reduction: (previous: U, current: T, index: number) => U, initialValue: U): U;

	// noinspection DuplicatedCode
	/**
	 * Applies a reducer function to all the elements in this sequence.
	 * The specified `initialValue` is used as the initial accumulator value, and the specified function is used to select the result value.
	 * If no `initialValue` is specified, the first entry in the sequence is used.
	 * @param {(previous: U, current: T, index: number) => U} reducer
	 * @param {U} initialValue Optional initial value to begin with.
	 * @return {U}
	 */
	reduce<U> (reducer: (previous: U, current: T, index: number) => U, initialValue?: U): U
	{

		if(!reducer) throw new ArgumentNullException('reducer');
		let i = 0;
		if(initialValue===undefined)
		{
			const iterator = this[Symbol.iterator]();
			let n = iterator.next();
			if(n.done) throw new InvalidOperationException('Sequence is empty.  Specify an initial value allow for an empty iterable.');
			let previous: any = n.value;
			while(!(n = iterator.next()).done) previous = reducer(previous, n.value, ++i);
			return previous;
		}
		else
		{
			let previous: any = initialValue;
			for(const current of this) previous = reducer(previous, current, i++);
			return previous;
		}
	}

	/**
	 * Copies all values to a numerically indexable object.
	 * @param {TTarget} target
	 * @param {number} index
	 * @returns {TTarget}
	 */
	copyTo<TTarget extends ArrayLikeWritable<T>> (target: TTarget, index: number = 0): TTarget
	{
		return copyIterableTo(this, target, index);
	}

	/**
	 * Creates a copy of the contents as an array.
	 * @returns {[]}
	 */
	toArray (): T[]
	{
		return this.copyTo([]);
	}

	/**
	 * Returns the number of items contained in the collection by iterating the contents.
	 * @returns {number}
	 */
	getCount (): number
	{
		let count = 0;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for(const _ of this) count++;
		return count;
	}
}

/**
 * Extends an iterable with methods like filter, map, and reduce.
 */
export class ExtendedIterable<T>
	extends ReadOnlyIterableCollectionBase<T>
{
	protected constructor (private _source: Iterable<T>)
	{
		super();
	}

	/**
	 * Creates an ExtendedIterable wrapper for the provided source.
	 * @param {Iterable<T>} source
	 * @return {ExtendedIterable<T>}
	 */
	static create<T> (source: Iterable<T>): ExtendedIterable<T>
	{
		return new ExtendedIterable<T>(source);
	}

	protected _getIterator (): Iterator<T>
	{
		return this._source[Symbol.iterator]();
	}
}
