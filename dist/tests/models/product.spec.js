"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/***** imports *****/
var product_1 = __importDefault(require("../../models/product"));
var category_1 = __importDefault(require("../../models/category"));
var database_1 = __importDefault(require("../../database"));
/***** variables *****/
var productModel = new product_1.default();
var categoryModel = new category_1.default();
/***** test cases *****/
// Test Product Model
describe('Test Product Model', function () {
    // test method defination
    describe('test method defination', function () {
        it('Get Many Products', function () {
            expect(productModel.getAllProducts).toBeDefined();
        });
        it('Get One Product', function () {
            expect(productModel.getProductById).toBeDefined();
        });
        it('Create Product', function () {
            expect(productModel.createNewProduct).toBeDefined();
        });
        it('Update Product', function () {
            expect(productModel.updateProductById).toBeDefined();
        });
        it('Delete Product', function () {
            expect(productModel.deleteProductById).toBeDefined();
        });
    });
    //   test functionality
    describe('testfunctionality', function () {
        var category = {
            name: 'Electronics-test',
        };
        var product = {
            name: 'product-test',
            price: 20000,
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdCategory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, categoryModel.createNewCategory(category)];
                    case 1:
                        createdCategory = _a.sent();
                        category.id = createdCategory.id;
                        product.category_id = category.id;
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var connection, sql, sql2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'DELETE FROM products;';
                        sql2 = 'DELETE FROM categories;';
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, connection.query(sql2)];
                    case 3:
                        _a.sent();
                        connection.release();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Create Product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.createNewProduct(__assign({}, product))];
                    case 1:
                        createdProduct = _a.sent();
                        product.id = createdProduct.id;
                        expect(createdProduct.id).toEqual(product.id);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Get Many Categories', function () { return __awaiter(void 0, void 0, void 0, function () {
            var categories;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.getAllProducts()];
                    case 1:
                        categories = _a.sent();
                        expect(categories.length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Get One Product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var returnedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.getProductById(product.id)];
                    case 1:
                        returnedProduct = _a.sent();
                        expect(returnedProduct.id).toBe(product.id);
                        expect(returnedProduct.name).toBe(product.name);
                        expect(returnedProduct.price).toBe(product.price);
                        expect(returnedProduct.category_id).toBe(product.category_id);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Update Product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updatedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.updateProductById(__assign(__assign({}, product), { name: 'product-test-edit' }))];
                    case 1:
                        updatedProduct = _a.sent();
                        expect(updatedProduct.id).toBe(product.id);
                        expect(updatedProduct.name).toBe(updatedProduct.name);
                        expect(updatedProduct.name).toBe('product-test-edit');
                        expect(updatedProduct.price).toBe(updatedProduct.price);
                        expect(updatedProduct.category_id).toBe(updatedProduct.category_id);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Delete Product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var deletedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.deleteProductById(product.id)];
                    case 1:
                        deletedProduct = _a.sent();
                        expect(deletedProduct.id).toBe(product.id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
