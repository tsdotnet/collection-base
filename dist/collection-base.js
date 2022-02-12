"use strict";
/**
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionBase = exports.ReadOnlyIterableCollectionBase = exports.ReadOnlyCollectionBase = exports.ExtendedIterable = exports.IterableCollectionBase = exports.IterableBase = exports.indexIterable = exports.arrayLikeIterable = exports.copyIterableTo = void 0;
const tslib_1 = require("tslib");
const arrayLikeIterable_1 = (0, tslib_1.__importDefault)(require("./arrayLikeIterable"));
exports.arrayLikeIterable = arrayLikeIterable_1.default;
const CollectionBase_1 = (0, tslib_1.__importDefault)(require("./CollectionBase"));
exports.CollectionBase = CollectionBase_1.default;
const copyIterableTo_1 = (0, tslib_1.__importDefault)(require("./copyIterableTo"));
exports.copyIterableTo = copyIterableTo_1.default;
const indexIterable_1 = (0, tslib_1.__importDefault)(require("./indexIterable"));
exports.indexIterable = indexIterable_1.default;
const IterableBase_1 = (0, tslib_1.__importDefault)(require("./IterableBase"));
exports.IterableBase = IterableBase_1.default;
const IterableCollectionBase_1 = (0, tslib_1.__importDefault)(require("./IterableCollectionBase"));
exports.IterableCollectionBase = IterableCollectionBase_1.default;
const ReadOnlyCollectionBase_1 = (0, tslib_1.__importDefault)(require("./ReadOnlyCollectionBase"));
exports.ReadOnlyCollectionBase = ReadOnlyCollectionBase_1.default;
const ReadOnlyIterableCollectionBase_1 = (0, tslib_1.__importStar)(require("./ReadOnlyIterableCollectionBase"));
exports.ReadOnlyIterableCollectionBase = ReadOnlyIterableCollectionBase_1.default;
Object.defineProperty(exports, "ExtendedIterable", { enumerable: true, get: function () { return ReadOnlyIterableCollectionBase_1.ExtendedIterable; } });
//# sourceMappingURL=collection-base.js.map