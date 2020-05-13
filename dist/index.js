"use strict";
/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionBase = exports.ReadOnlyCollectionBase = exports.indexIterable = exports.arrayLikeIterable = exports.copyIterableTo = void 0;
const tslib_1 = require("tslib");
const arrayLikeIterable_1 = tslib_1.__importStar(require("./arrayLikeIterable"));
exports.arrayLikeIterable = arrayLikeIterable_1.default;
Object.defineProperty(exports, "indexIterable", { enumerable: true, get: function () { return arrayLikeIterable_1.indexIterable; } });
const CollectionBase_1 = tslib_1.__importDefault(require("./CollectionBase"));
exports.CollectionBase = CollectionBase_1.default;
const copyIterableTo_1 = tslib_1.__importDefault(require("./copyIterableTo"));
exports.copyIterableTo = copyIterableTo_1.default;
const IterableCollectionBase_1 = tslib_1.__importDefault(require("./IterableCollectionBase"));
const ReadOnlyCollectionBase_1 = tslib_1.__importDefault(require("./ReadOnlyCollectionBase"));
exports.ReadOnlyCollectionBase = ReadOnlyCollectionBase_1.default;
exports.default = IterableCollectionBase_1.default;
//# sourceMappingURL=index.js.map