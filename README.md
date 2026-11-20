<a href="https://tsdotnet.github.io/collection-base/"><img src="https://cdn.jsdelivr.net/gh/tsdotnet/collection-base@master/assets/banner.svg" alt="@tsdotnet/collection-base: Build collections fast. Abstract bases with the plumbing done."></a>

[![npm version](https://img.shields.io/npm/v/@tsdotnet/collection-base.svg?style=flat-square)](https://www.npmjs.com/package/@tsdotnet/collection-base)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/tsdotnet/collection-base/blob/master/LICENSE)

Abstract base classes for building your own collections, with counting, iteration and bulk adds handled for you.

## Install

```sh
npm install @tsdotnet/collection-base
```

## Usage

```ts
import { CollectionBase } from '@tsdotnet/collection-base';

class Bag extends CollectionBase<string> {
  constructor () { super(); } // the base constructor is protected
  private _set = new Set<string>();
  protected _addInternal (e: string) { const n = this._set.size; this._set.add(e); return this._set.size > n; }
  protected _removeInternal (e: string) { return this._set.delete(e) ? 1 : 0; }
  protected _clearInternal () { const n = this._set.size; this._set.clear(); return n; }
  protected _getIterator () { return this._set.values(); }
}

const bag = new Bag().add('a').add('b');
bag.count; // 2
bag.contains('a'); // true
```

You write four small methods; the base supplies `count`, `contains`, `addEntries`, versioning and more. Read-only and iterable-only bases are included.

## Use it from

ESM (`import { CollectionBase } from '@tsdotnet/collection-base';`) or CommonJS (`const { CollectionBase } = require('@tsdotnet/collection-base');`).

<details><summary>In a browser, without a bundler</summary>

```html
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/type@1/dist/umd/type.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/compare@1/dist/umd/compare.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/exceptions@1/dist/umd/exceptions.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/collection-base@2/dist/umd/collection-base.min.js"></script>
<script>
  const { CollectionBase } = tsdotnet.collectionBase;
</script>
```

</details>

## Docs

[tsdotnet.github.io/collection-base](https://tsdotnet.github.io/collection-base/)
