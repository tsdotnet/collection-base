/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import {beforeEach, describe, expect, it} from 'vitest';
import ReadOnlyIterableCollectionBase, {ExtendedIterable} from '../src/ReadOnlyIterableCollectionBase';
import {ArgumentNullException, InvalidOperationException} from '@tsdotnet/exceptions';

// Concrete implementation for testing
class TestReadOnlyCollection<T> extends ReadOnlyIterableCollectionBase<T> {
	private _items: T[];

	constructor(items: T[] = []) {
		super();
		this._items = [...items];
	}

	protected _getIterator(): Iterator<T> {
		return this._items[Symbol.iterator]();
	}

	// Helper method to access protected members for testing
	public getIteratorForTest(): Iterator<T> {
		return this._getIterator();
	}
}

describe('ReadOnlyIterableCollectionBase', () => {
	let collection: TestReadOnlyCollection<number>;

	beforeEach(() => {
		collection = new TestReadOnlyCollection([1, 2, 3, 4, 5]);
	});

	describe('filter', () => {
		it('should filter elements based on predicate', () => {
			const filtered = collection.filter(x => x > 3);
			const result = [...filtered];
			expect(result).toEqual([4, 5]);
		});

		it('should filter with index parameter', () => {
			const filtered = collection.filter((x, i) => i % 2 === 0);
			const result = [...filtered];
			expect(result).toEqual([1, 3, 5]); // items at indices 0, 2, 4
		});

		it('should return empty for no matches', () => {
			const filtered = collection.filter(x => x > 10);
			const result = [...filtered];
			expect(result).toEqual([]);
		});

		it('should return all elements when all match', () => {
			const filtered = collection.filter(() => true);
			const result = [...filtered];
			expect(result).toEqual([1, 2, 3, 4, 5]);
		});

		it('should throw when predicate is null', () => {
			expect(() => collection.filter(null as any)).toThrow(ArgumentNullException);
		});

		it('should throw when predicate is undefined', () => {
			expect(() => collection.filter(undefined as any)).toThrow(ArgumentNullException);
		});

		it('should return ExtendedIterable', () => {
			const filtered = collection.filter(x => x > 3);
			expect(filtered).toBeInstanceOf(ExtendedIterable);
		});

		it('should be reusable', () => {
			const filtered = collection.filter(x => x > 3);
			const result1 = [...filtered];
			const result2 = [...filtered];
			expect(result1).toEqual(result2);
		});
	});

	describe('map', () => {
		it('should transform elements', () => {
			const mapped = collection.map(x => x * 2);
			const result = [...mapped];
			expect(result).toEqual([2, 4, 6, 8, 10]);
		});

		it('should map with index parameter', () => {
			const mapped = collection.map((x, i) => x + i);
			const result = [...mapped];
			expect(result).toEqual([1, 3, 5, 7, 9]); // [1+0, 2+1, 3+2, 4+3, 5+4]
		});

		it('should change types', () => {
			const mapped = collection.map(x => x.toString());
			const result = [...mapped];
			expect(result).toEqual(['1', '2', '3', '4', '5']);
		});

		it('should handle empty collection', () => {
			const empty = new TestReadOnlyCollection<number>([]);
			const mapped = empty.map(x => x * 2);
			const result = [...mapped];
			expect(result).toEqual([]);
		});

		it('should throw when selector is null', () => {
			expect(() => collection.map(null as any)).toThrow(ArgumentNullException);
		});

		it('should throw when selector is undefined', () => {
			expect(() => collection.map(undefined as any)).toThrow(ArgumentNullException);
		});

		it('should return ExtendedIterable', () => {
			const mapped = collection.map(x => x * 2);
			expect(mapped).toBeInstanceOf(ExtendedIterable);
		});
	});

	describe('reduce', () => {
		describe('with no initial value', () => {
			it('should reduce elements', () => {
				const result = collection.reduce((sum: number, x: number) => sum + x);
				expect(result).toBe(15); // 1 + 2 + 3 + 4 + 5
			});

			it('should use first element as initial value', () => {
				const result = collection.reduce((acc: number, x: number, i: number) => acc + (x * i));
				expect(result).toBe(41); // 1 + (2*1) + (3*2) + (4*3) + (5*4) = 1 + 2 + 6 + 12 + 20 = 41
			});

			it('should work with single element', () => {
				const single = new TestReadOnlyCollection([42]);
				const result = single.reduce((sum: number, x: number) => sum + x);
				expect(result).toBe(42);
			});

			it('should throw for empty collection', () => {
				const empty = new TestReadOnlyCollection<number>([]);
				expect(() => empty.reduce((sum: number, x: number) => sum + x)).toThrow(InvalidOperationException);
			});
		});

		describe('with initial value', () => {
			it('should reduce with initial value', () => {
				const result = collection.reduce((sum: number, x: number) => sum + x, 10);
				expect(result).toBe(25); // 10 + 1 + 2 + 3 + 4 + 5
			});

			it('should work with different return type', () => {
				const result = collection.reduce((acc: string, x: number, i: number) => acc + x + '-', '');
				expect(result).toBe('1-2-3-4-5-');
			});

			it('should handle empty collection with initial value', () => {
				const empty = new TestReadOnlyCollection<number>([]);
				const result = empty.reduce((sum: number, x: number) => sum + x, 100);
				expect(result).toBe(100);
			});

			it('should pass correct indices', () => {
				const indices: number[] = [];
				collection.reduce((acc: number, x: number, i: number) => {
					indices.push(i);
					return acc + x;
				}, 0);
				expect(indices).toEqual([0, 1, 2, 3, 4]);
			});
		});

		it('should throw when reducer is null', () => {
			expect(() => collection.reduce(null as any)).toThrow(ArgumentNullException);
		});

		it('should throw when reducer is undefined', () => {
			expect(() => collection.reduce(undefined as any)).toThrow(ArgumentNullException);
		});
	});

	describe('copyTo', () => {
		it('should copy to array', () => {
			const target: number[] = [];
			const result = collection.copyTo(target);
			
			expect(result).toBe(target);
			expect(target).toEqual([1, 2, 3, 4, 5]);
		});

		it('should copy to array with index', () => {
			const target = new Array(8);
			collection.copyTo(target, 2);
			
			expect(target[2]).toBe(1);
			expect(target[3]).toBe(2);
			expect(target[4]).toBe(3);
			expect(target[5]).toBe(4);
			expect(target[6]).toBe(5);
		});

		it('should default to index 0', () => {
			const target: number[] = [];
			collection.copyTo(target);
			
			expect(target).toEqual([1, 2, 3, 4, 5]);
		});

		it('should handle empty collection', () => {
			const empty = new TestReadOnlyCollection<number>([]);
			const target: number[] = [];
			empty.copyTo(target);
			
			expect(target).toEqual([]);
		});
	});

	describe('toArray', () => {
		it('should create array copy', () => {
			const result = collection.toArray();
			expect(result).toEqual([1, 2, 3, 4, 5]);
			expect(Array.isArray(result)).toBe(true);
		});

		it('should create independent copy', () => {
			const result = collection.toArray();
			result[0] = 999;
			
			const original = collection.toArray();
			expect(original[0]).toBe(1);
		});

		it('should handle empty collection', () => {
			const empty = new TestReadOnlyCollection<number>([]);
			const result = empty.toArray();
			expect(result).toEqual([]);
		});
	});

	describe('getCount', () => {
		it('should return correct count', () => {
			expect(collection.getCount()).toBe(5);
		});

		it('should handle empty collection', () => {
			const empty = new TestReadOnlyCollection<number>([]);
			expect(empty.getCount()).toBe(0);
		});

		it('should count by iteration', () => {
			// This tests the internal counting mechanism
			const countedItems: number[] = [];
			const counting = new TestReadOnlyCollection([10, 20, 30]);
			
			// Mock the iterator to track what gets counted
			const originalIterator = counting.getIteratorForTest.bind(counting);
			counting.getIteratorForTest = function() {
				const iter = originalIterator();
				return {
					next() {
						const result = iter.next();
						if (!result.done) countedItems.push(result.value);
						return result;
					}
				};
			};
			
			const count = counting.getCount();
			expect(count).toBe(3);
		});
	});

	describe('chaining operations', () => {
		it('should chain filter and map', () => {
			const result = [...collection
				.filter(x => x > 2)
				.map(x => x * 10)];
			expect(result).toEqual([30, 40, 50]);
		});

		it('should chain multiple filters', () => {
			const result = [...collection
				.filter(x => x > 1)
				.filter(x => x < 5)];
			expect(result).toEqual([2, 3, 4]);
		});

		it('should chain map and reduce', () => {
			const result = collection
				.map(x => x * 2)
				.reduce((sum: number, x: number) => sum + x, 0);
			expect(result).toBe(30); // (1+2+3+4+5)*2 = 30
		});
	});

	describe('ExtendedIterable static methods', () => {
		it('should create ExtendedIterable from array', () => {
			const extended = ExtendedIterable.create([10, 20, 30]);
			const result = [...extended];
			expect(result).toEqual([10, 20, 30]);
		});

		it('should create ExtendedIterable from Set', () => {
			const extended = ExtendedIterable.create(new Set([1, 2, 3]));
			const result = [...extended];
			expect(result).toEqual([1, 2, 3]);
		});

		it('should preserve ExtendedIterable functionality', () => {
			const extended = ExtendedIterable.create([1, 2, 3, 4]);
			const result = [...extended.filter(x => x > 2).map(x => x * 10)];
			expect(result).toEqual([30, 40]);
		});
	});

	describe('edge cases and error handling', () => {
		it('should handle complex predicates and selectors', () => {
			const strings = new TestReadOnlyCollection(['apple', 'banana', 'cherry']);
			const result = [...strings
				.filter(s => s.length > 5)
				.map(s => s.toUpperCase())];
			expect(result).toEqual(['BANANA', 'CHERRY']);
		});

		it('should maintain correct behavior with null/undefined values', () => {
			const mixed = new TestReadOnlyCollection([null, 1, undefined, 2]);
			const filtered = [...mixed.filter(x => x != null)];
			expect(filtered).toEqual([1, 2]);
		});

		it('should handle large datasets', () => {
			const large = new TestReadOnlyCollection(Array.from({length: 1000}, (_, i) => i));
			const filtered = [...large.filter(x => x % 100 === 0).map(x => x / 100)];
			expect(filtered).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
		});
	});
});
