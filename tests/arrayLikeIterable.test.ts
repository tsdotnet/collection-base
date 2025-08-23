/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import {describe, expect, it} from 'vitest';
import arrayLikeIterable from '../src/arrayLikeIterable';

describe('arrayLikeIterable', () => {
	describe('array inputs', () => {
		it('should return array directly when input is array', () => {
			const source = [1, 2, 3];
			const result = arrayLikeIterable(source);
			
			expect(result).toBe(source); // Same reference
			expect([...result]).toEqual([1, 2, 3]);
		});

		it('should return empty array directly', () => {
			const source: number[] = [];
			const result = arrayLikeIterable(source);
			
			expect(result).toBe(source);
			expect([...result]).toEqual([]);
		});

		it('should work with typed arrays that extend Array', () => {
			const source = [1, 2, 3] as number[];
			const result = arrayLikeIterable(source);
			
			expect(result).toBe(source);
		});
	});

	describe('array-like inputs', () => {
		it('should wrap string with iterable', () => {
			const source = 'hello';
			const result = arrayLikeIterable(source);
			
			expect(result).not.toBe(source); // Different reference
			expect([...result]).toEqual(['h', 'e', 'l', 'l', 'o']);
		});

		it('should wrap arguments-like object', () => {
			const source = {0: 'a', 1: 'b', 2: 'c', length: 3};
			const result = arrayLikeIterable(source);
			
			expect(result).not.toBe(source);
			expect([...result]).toEqual(['a', 'b', 'c']);
		});

		it('should wrap NodeList-like object', () => {
			const source = {0: 'first', 1: 'second', length: 2};
			const result = arrayLikeIterable(source);
			
			expect([...result]).toEqual(['first', 'second']);
		});

		it('should wrap Uint8Array', () => {
			const source = new Uint8Array([1, 2, 3]);
			const result = arrayLikeIterable(source);
			
			expect(result).not.toBe(source);
			expect([...result]).toEqual([1, 2, 3]);
		});

		it('should wrap typed arrays', () => {
			const source = new Int32Array([10, 20, 30]);
			const result = arrayLikeIterable(source);
			
			expect([...result]).toEqual([10, 20, 30]);
		});
	});

	describe('edge cases', () => {
		it('should handle empty string', () => {
			const source = '';
			const result = arrayLikeIterable(source);
			
			expect([...result]).toEqual([]);
		});

		it('should handle empty array-like object', () => {
			const source = {length: 0};
			const result = arrayLikeIterable(source);
			
			expect([...result]).toEqual([]);
		});

		it('should handle array-like with undefined values', () => {
			const source = {0: 1, 1: undefined, 2: 3, length: 3};
			const result = arrayLikeIterable(source);
			
			expect([...result]).toEqual([1, undefined, 3]);
		});
	});

	describe('type preservation', () => {
		it('should preserve original array reference and type', () => {
			const source = ['a', 'b', 'c'];
			const result = arrayLikeIterable(source);
			
			// Should be the exact same array instance
			expect(result).toBe(source);
			expect(Array.isArray(result)).toBe(true);
		});

		it('should create iterable for non-array types', () => {
			const source = 'test';
			const result = arrayLikeIterable(source);
			
			expect(result).not.toBe(source);
			expect(Array.isArray(result)).toBe(false);
			expect(typeof result[Symbol.iterator]).toBe('function');
		});
	});

	describe('iteration behavior', () => {
		it('should maintain iteration order for arrays', () => {
			const source = [3, 1, 4, 1, 5];
			const result = arrayLikeIterable(source);
			
			expect([...result]).toEqual([3, 1, 4, 1, 5]);
		});

		it('should maintain iteration order for array-likes', () => {
			const source = {0: 'z', 1: 'a', 2: 'm', length: 3};
			const result = arrayLikeIterable(source);
			
			expect([...result]).toEqual(['z', 'a', 'm']);
		});

		it('should be reusable for both arrays and array-likes', () => {
			const array = [1, 2];
			const arrayLike = {0: 'a', 1: 'b', length: 2};
			
			const arrayResult = arrayLikeIterable(array);
			const arrayLikeResult = arrayLikeIterable(arrayLike);
			
			expect([...arrayResult]).toEqual([1, 2]);
			expect([...arrayResult]).toEqual([1, 2]); // Should work multiple times
			
			expect([...arrayLikeResult]).toEqual(['a', 'b']);
			expect([...arrayLikeResult]).toEqual(['a', 'b']); // Should work multiple times
		});
	});

	describe('mixed scenarios', () => {
		it('should handle subarray slices', () => {
			const source = [1, 2, 3, 4, 5].slice(1, 4);
			const result = arrayLikeIterable(source);
			
			expect(result).toBe(source); // Still an array
			expect([...result]).toEqual([2, 3, 4]);
		});

		it('should handle array-like objects with extra properties', () => {
			const source = {
				0: 'first',
				1: 'second', 
				length: 2,
				extraProp: 'should be ignored'
			};
			const result = arrayLikeIterable(source);
			
			expect([...result]).toEqual(['first', 'second']);
		});

		it('should work with large array-like objects', () => {
			const source = Array.from({length: 1000}, (_, i) => i);
			const result = arrayLikeIterable(source);
			
			expect(result).toBe(source); // Array optimization
			expect([...result].slice(0, 5)).toEqual([0, 1, 2, 3, 4]);
			expect([...result].slice(-5)).toEqual([995, 996, 997, 998, 999]);
		});
	});
});
