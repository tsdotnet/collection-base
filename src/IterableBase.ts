
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import {SelectorWithIndex} from '@tsdotnet/common-interfaces';
import {ArgumentNullException} from '@tsdotnet/exceptions';

/*
 * NOTE: Care should be taken not to introduce methods here that would cause an iterable to never complete.
 * A 'filter' method for example could perpetually loop with a predicate that never returns true.
 */

/**
 * Some iterables/generators can be infinite.
 * This class is provided as a base for implementing any iterable including endless ones.
 */
export default abstract class IterableBase<T>
implements Iterable<T>
{
	protected constructor () { /* make protected */ }

	[Symbol.iterator] (): Iterator<T>
	{
		return this._getIterator();
	}

	/**
	 * Returns an iterable mapped by the provided selector.
	 * @param {SelectorWithIndex<T, TResult>} selector
	 * @return {Iterable<TResult>}
	 */
	map<TResult> (selector: SelectorWithIndex<T, TResult>): Iterable<TResult>
	{
		if(!selector) throw new ArgumentNullException('selector');
		const _ = this;
		return {
			* [Symbol.iterator] (): Iterator<TResult>
			{
				let i = 0;
				for(const e of _) yield selector(e, i++);
			}
		};
	}

	/**
	 * Override to define the actual iterator.
	 * The [Symbol.iterator] should not be overridden as it handles version tracking.
	 * @returns {Iterator}
	 * @private
	 */
	protected abstract _getIterator (): Iterator<T>;
}
