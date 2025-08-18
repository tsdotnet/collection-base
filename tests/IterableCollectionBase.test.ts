/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import {describe, it, expect} from 'vitest';
import IterableCollectionBase from '../src/IterableCollectionBase';

/**
 * Simple test implementation of IterableCollectionBase
 */
class TestCollection<T> extends IterableCollectionBase<T> {
	private _items: T[] = [];

	constructor() {
		super();
	}

	add(item: T): this {
		this._items.push(item);
		this.incrementVersion();
		return this;
	}

	clear(): number {
		const count = this._items.length;
		this._items.length = 0;
		this.incrementVersion();
		return count;
	}

	getCount(): number {
		return this._items.length;
	}

	get count(): number {
		return this.getCount();
	}

	protected *_getIterator(): Iterator<T> {
		for (const item of this._items) {
			yield item;
		}
	}

	// Helper method to access items for testing
	getItems(): readonly T[] {
		return [...this._items];
	}
}

describe('IterableCollectionBase', () => {
	it('should throw when modified during iteration', () => {
		const collection = new TestCollection<string>();
		collection.add('item1');
		collection.add('item2');
		collection.add('item3');

		console.log('Before iteration - version:', collection.version, 'count:', collection.count);

		expect(() => {
			let iterationCount = 0;
			for (const item of collection) {
				iterationCount++;
				console.log(`Iteration ${iterationCount}: processing item`, item);
				console.log('Before add - version:', collection.version);
				collection.add(`new-${item}`);
				console.log('After add - version:', collection.version);
			}
			console.log('Loop completed without throwing. Total iterations:', iterationCount);
		}).toThrow('Version mismatch. The collection was modified.');
	});

	it('should not throw when not modified during iteration', () => {
		const collection = new TestCollection<string>();
		collection.add('item1');
		collection.add('item2');
		collection.add('item3');

		const items: string[] = [];
		
		expect(() => {
			for (const item of collection) {
				items.push(item);
			}
		}).not.toThrow();

		expect(items).toEqual(['item1', 'item2', 'item3']);
	});

	it('should track version changes correctly', () => {
		const collection = new TestCollection<string>();
		expect(collection.version).toBe(0);

		collection.add('item1');
		expect(collection.version).toBe(1);

		collection.add('item2');
		expect(collection.version).toBe(2);

		collection.clear();
		expect(collection.version).toBe(3);
	});

	it('should assert version correctly', () => {
		const collection = new TestCollection<string>();
		const initialVersion = collection.version;

		// Should not throw for correct version
		expect(() => collection.assertVersion(initialVersion)).not.toThrow();

		// Add an item to change version
		collection.add('item1');
		const newVersion = collection.version;

		// Should throw for old version
		expect(() => collection.assertVersion(initialVersion)).toThrow('Version mismatch. The collection was modified.');

		// Should not throw for new version
		expect(() => collection.assertVersion(newVersion)).not.toThrow();
	});
});
