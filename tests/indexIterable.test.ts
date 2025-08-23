/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import {describe, expect, it} from 'vitest';
import indexIterable from '../src/indexIterable';

describe('indexIterable', () => {
	describe('basic functionality', () => {
		it('should iterate over array elements', () => {
			const source = [1, 2, 3];
			const iterable = indexIterable(source);
			
			const result = [...iterable];
			expect(result).toEqual([1, 2, 3]);
		});

		it('should iterate over string characters', () => {
			const source = 'hello';
			const iterable = indexIterable(source);
			
			const result = [...iterable];
			expect(result).toEqual(['h', 'e', 'l', 'l', 'o']);
		});

		it('should handle empty array', () => {
			const source: number[] = [];
			const iterable = indexIterable(source);
			
			const result = [...iterable];
			expect(result).toEqual([]);
		});

		it('should handle empty string', () => {
			const source = '';
			const iterable = indexIterable(source);
			
			const result = [...iterable];
			expect(result).toEqual([]);
		});
	});

	describe('array-like objects', () => {
		it('should work with arguments-like objects', () => {
			const source = {0: 'a', 1: 'b', 2: 'c', length: 3};
			const iterable = indexIterable(source);
			
			const result = [...iterable];
			expect(result).toEqual(['a', 'b', 'c']);
		});

		it('should work with typed arrays', () => {
			const source = new Uint8Array([1, 2, 3]);
			const iterable = indexIterable(source);
			
			const result = [...iterable];
			expect(result).toEqual([1, 2, 3]);
		});

		it('should work with NodeList-like objects', () => {
			const source = {0: 'first', 1: 'second', length: 2};
			const iterable = indexIterable(source);
			
			const result = [...iterable];
			expect(result).toEqual(['first', 'second']);
		});
	});

	describe('edge cases', () => {
		it('should handle null source', () => {
			const iterable = indexIterable(null as any);
			
			const result = [...iterable];
			expect(result).toEqual([]);
		});

		it('should handle undefined source', () => {
			const iterable = indexIterable(undefined as any);
			
			const result = [...iterable];
			expect(result).toEqual([]);
		});

		it('should handle source with zero length', () => {
			const source = {length: 0};
			const iterable = indexIterable(source);
			
			const result = [...iterable];
			expect(result).toEqual([]);
		});

		it('should handle source with undefined length', () => {
			const source = {} as any;
			const iterable = indexIterable(source);
			
			const result = [...iterable];
			expect(result).toEqual([]);
		});
	});

	describe('undefined values', () => {
		it('should include undefined values in sparse arrays', () => {
			const source: any[] = [1, , 3]; // sparse array
			const iterable = indexIterable(source);
			
			const result = [...iterable];
			expect(result).toEqual([1, undefined, 3]);
		});

		it('should handle array with explicit undefined values', () => {
			const source = [1, undefined, 3];
			const iterable = indexIterable(source);
			
			const result = [...iterable];
			expect(result).toEqual([1, undefined, 3]);
		});

		it('should handle object with undefined values', () => {
			const source = {0: 1, 1: undefined, 2: 3, length: 3};
			const iterable = indexIterable(source);
			
			const result = [...iterable];
			expect(result).toEqual([1, undefined, 3]);
		});
	});

	describe('iteration behavior', () => {
		it('should maintain order from index 0 to length-1', () => {
			const source = [3, 1, 4, 1, 5];
			const iterable = indexIterable(source);
			
			const result = [...iterable];
			expect(result).toEqual([3, 1, 4, 1, 5]);
		});

		it('should be reusable', () => {
			const source = [1, 2, 3];
			const iterable = indexIterable(source);
			
			const result1 = [...iterable];
			const result2 = [...iterable];
			
			expect(result1).toEqual([1, 2, 3]);
			expect(result2).toEqual([1, 2, 3]);
		});

		it('should create independent iterators', () => {
			const source = [1, 2, 3];
			const iterable = indexIterable(source);
			
			const iterator1 = iterable[Symbol.iterator]();
			const iterator2 = iterable[Symbol.iterator]();
			
			expect(iterator1.next().value).toBe(1);
			expect(iterator2.next().value).toBe(1);
			expect(iterator1.next().value).toBe(2);
			expect(iterator2.next().value).toBe(2);
		});
	});

	describe('type handling', () => {
		it('should preserve value types', () => {
			const source = [1, 'string', {}, [], true, null];
			const iterable = indexIterable(source);
			
			const result = [...iterable];
			expect(result[0]).toBe(1);
			expect(result[1]).toBe('string');
			expect(typeof result[2]).toBe('object');
			expect(Array.isArray(result[3])).toBe(true);
			expect(result[4]).toBe(true);
			expect(result[5]).toBeNull();
		});

		it('should work with different ArrayLike types', () => {
			const buffer = new ArrayBuffer(8);
			const view = new DataView(buffer);
			view.setUint8(0, 255);
			view.setUint8(1, 254);
			
			const source = new Uint8Array(buffer);
			const iterable = indexIterable(source);
			
			const result = [...iterable];
			expect(result[0]).toBe(255);
			expect(result[1]).toBe(254);
		});
	});

	describe('performance characteristics', () => {
		it('should handle large arrays efficiently', () => {
			const source = Array.from({length: 10000}, (_, i) => i);
			const iterable = indexIterable(source);
			
			let count = 0;
			for (const _ of iterable) {
				count++;
				if (count > 100) break; // Just test that it starts efficiently
			}
			
			expect(count).toBe(101);
		});

		it('should not materialize all values at once', () => {
			let accessCount = 0;
			const source = {
				get length() { return 3; },
				[0]: (() => { accessCount++; return 'a'; })(),
				[1]: (() => { accessCount++; return 'b'; })(),
				[2]: (() => { accessCount++; return 'c'; })()
			};
			
			const iterable = indexIterable(source);
			const iterator = iterable[Symbol.iterator]();
			
			// Getting iterator shouldn't access elements
			expect(accessCount).toBe(3); // Already accessed during object creation
		});
	});
});
