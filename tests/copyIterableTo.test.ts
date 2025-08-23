/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import {describe, expect, it} from 'vitest';
import copyIterableTo from '../src/copyIterableTo';
import {ArgumentNullException} from '@tsdotnet/exceptions';

describe('copyIterableTo', () => {
	describe('basic functionality', () => {
		it('should copy array elements to target array', () => {
			const source = [1, 2, 3];
			const target: number[] = [];
			
			const result = copyIterableTo(source, target);
			
			expect(result).toBe(target);
			expect(target).toEqual([1, 2, 3]);
		});

		it('should copy iterable elements to target array', () => {
			const source = new Set([1, 2, 3]);
			const target: number[] = [];
			
			const result = copyIterableTo(source, target);
			
			expect(result).toBe(target);
			expect(target).toEqual([1, 2, 3]);
		});

		it('should handle empty iterable', () => {
			const source: number[] = [];
			const target: number[] = [];
			
			copyIterableTo(source, target);
			
			expect(target).toEqual([]);
		});
	});

	describe('index parameter', () => {
		it('should copy elements starting at specified index', () => {
			const source = ['a', 'b', 'c'];
			const target = new Array(5);
			
			copyIterableTo(source, target, 2);
			
			expect(target[2]).toBe('a');
			expect(target[3]).toBe('b');
			expect(target[4]).toBe('c');
		});

		it('should default to index 0 when not specified', () => {
			const source = [1, 2];
			const target: number[] = [];
			
			copyIterableTo(source, target);
			
			expect(target).toEqual([1, 2]);
		});

		it('should handle index 0 explicitly', () => {
			const source = [1, 2];
			const target: number[] = [];
			
			copyIterableTo(source, target, 0);
			
			expect(target).toEqual([1, 2]);
		});
	});

	describe('target types', () => {
		it('should work with array-like objects', () => {
			const source = [1, 2, 3];
			const target = {length: 0} as any;
			
			copyIterableTo(source, target);
			
			expect(target[0]).toBe(1);
			expect(target[1]).toBe(2);
			expect(target[2]).toBe(3);
		});

		it('should work with existing array content', () => {
			const source = ['x', 'y'];
			const target = ['a', 'b', 'c'];
			
			copyIterableTo(source, target, 1);
			
			expect(target).toEqual(['a', 'x', 'y']);
		});
	});

	describe('error conditions', () => {
		it('should throw when target is null', () => {
			const source = [1, 2, 3];
			
			expect(() => copyIterableTo(source, null as any)).toThrow(ArgumentNullException);
		});

		it('should throw when target is undefined', () => {
			const source = [1, 2, 3];
			
			expect(() => copyIterableTo(source, undefined as any)).toThrow(ArgumentNullException);
		});

		it('should throw with correct parameter name', () => {
			const source = [1, 2, 3];
			
			expect(() => copyIterableTo(source, null as any)).toThrow('target');
		});
	});

	describe('special values', () => {
		it('should handle null values in source', () => {
			const source = [null, undefined, 0, ''];
			const target: any[] = [];
			
			copyIterableTo(source, target);
			
			expect(target).toEqual([null, undefined, 0, '']);
		});

		it('should handle mixed types', () => {
			const source: any[] = [1, 'string', {}, []];
			const target: any[] = [];
			
			copyIterableTo(source, target);
			
			expect(target).toHaveLength(4);
			expect(target[0]).toBe(1);
			expect(target[1]).toBe('string');
			expect(typeof target[2]).toBe('object');
			expect(Array.isArray(target[3])).toBe(true);
		});
	});

	describe('generator sources', () => {
		it('should work with generator functions', () => {
			function* generator(): Generator<number> {
				yield 1;
				yield 2;
				yield 3;
			}
			
			const target: number[] = [];
			copyIterableTo(generator(), target);
			
			expect(target).toEqual([1, 2, 3]);
		});

		it('should work with custom iterables', () => {
			const customIterable: Iterable<string> = {
				*[Symbol.iterator]() {
					yield 'a';
					yield 'b';
					yield 'c';
				}
			};
			
			const target: string[] = [];
			copyIterableTo(customIterable, target);
			
			expect(target).toEqual(['a', 'b', 'c']);
		});
	});

	describe('edge cases', () => {
		it('should handle large iterables', () => {
			const source = Array.from({length: 1000}, (_, i) => i);
			const target: number[] = [];
			
			copyIterableTo(source, target);
			
			expect(target).toHaveLength(1000);
			expect(target[0]).toBe(0);
			expect(target[999]).toBe(999);
		});

		it('should preserve insertion order', () => {
			const source = [3, 1, 4, 1, 5];
			const target: number[] = [];
			
			copyIterableTo(source, target);
			
			expect(target).toEqual([3, 1, 4, 1, 5]);
		});

		it('should handle negative index (implementation dependent)', () => {
			const source = [1, 2];
			const target: any[] = [];
			
			// This behavior depends on the target implementation
			copyIterableTo(source, target, -1);
			
			expect(target[-1]).toBe(1);
			expect(target[0]).toBe(2);
		});
	});
});
