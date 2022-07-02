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
var category_1 = __importDefault(require("../../models/category"));
var database_1 = __importDefault(require("../../database"));
/***** variables *****/
var categoryModel = new category_1.default();
/***** test cases *****/
// Test Category Model
describe('Test Category Model', function () {
    // test methods defination
    describe('test methods defination', function () {
        it('Get Many Categories', function () {
            expect(categoryModel.getAllCategories).toBeDefined();
        });
        it('Get One Category', function () {
            expect(categoryModel.getCategoryById).toBeDefined();
        });
        it('Create Category', function () {
            expect(categoryModel.createNewCategory).toBeDefined();
        });
        it('Update Category', function () {
            expect(categoryModel.updateCategoryById).toBeDefined();
        });
        it('Delete Category', function () {
            expect(categoryModel.deleteCategoryById).toBeDefined();
        });
    });
    //   test functionality
    describe('test functionality', function () {
        var category = {
            name: 'Electronics-test',
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdCategory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, categoryModel.createNewCategory(category)];
                    case 1:
                        createdCategory = _a.sent();
                        category.id = createdCategory.id;
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var connection, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'DELETE FROM categories;';
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        _a.sent();
                        connection.release();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Create Category', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdCategory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, categoryModel.createNewCategory({
                            name: 'Electronics-test2',
                        })];
                    case 1:
                        createdCategory = _a.sent();
                        expect(createdCategory).toEqual({
                            id: createdCategory.id,
                            name: 'Electronics-test2',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('Get Many Categories', function () { return __awaiter(void 0, void 0, void 0, function () {
            var categories;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, categoryModel.getAllCategories()];
                    case 1:
                        categories = _a.sent();
                        expect(categories.length).toBe(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Get One Category', function () { return __awaiter(void 0, void 0, void 0, function () {
            var returnedCategory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, categoryModel.getCategoryById(category.id)];
                    case 1:
                        returnedCategory = _a.sent();
                        expect(returnedCategory.id).toBe(category.id);
                        expect(returnedCategory.name).toBe(category.name);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Update Category', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updatedCategory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, categoryModel.updateCategoryById(__assign(__assign({}, category), { name: 'Electronics-test-edit' }))];
                    case 1:
                        updatedCategory = _a.sent();
                        expect(updatedCategory.id).toBe(category.id);
                        expect(updatedCategory.name).toBe(updatedCategory.name);
                        expect(updatedCategory.name).toBe('Electronics-test-edit');
                        return [2 /*return*/];
                }
            });
        }); });
        it('Delete Category', function () { return __awaiter(void 0, void 0, void 0, function () {
            var deletedCategory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, categoryModel.deleteCategoryById(category.id)];
                    case 1:
                        deletedCategory = _a.sent();
                        expect(deletedCategory.id).toBe(category.id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
