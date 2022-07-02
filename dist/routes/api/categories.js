"use strict";
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
var express_1 = require("express");
var authentication_1 = __importDefault(require("../../middlewares/authentication"));
var category_1 = __importDefault(require("../../models/category"));
/***** variables *****/
var category = new category_1.default();
/***** Routes *****/
var categoryRoutes = (0, express_1.Router)();
/***** Api *****/
// get all categories
categoryRoutes.get('/', function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categories, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, category.getAllCategories()];
            case 1:
                categories = _a.sent();
                res.json({
                    status: 200,
                    data: categories,
                    message: 'success',
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.json({
                    status: 404,
                    message: "failed, ".concat(err_1.message),
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get category by id
categoryRoutes.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var selectedCategory, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, category.getCategoryById(req.params.id)];
            case 1:
                selectedCategory = _a.sent();
                res.json({
                    status: 200,
                    data: selectedCategory,
                    message: 'success',
                });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.json({
                    status: 404,
                    message: "failed, ".concat(err_2.message),
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// create new category
categoryRoutes.post('/', authentication_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newCategory, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, category.createNewCategory(req.body)];
            case 1:
                newCategory = _a.sent();
                res.json({
                    status: 200,
                    data: newCategory,
                    message: 'success',
                });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.json({
                    status: 404,
                    message: "failed, ".concat(err_3.message),
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// update category
categoryRoutes.patch('/:id', authentication_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedCategory, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, category.updateCategoryById(req.body)];
            case 1:
                updatedCategory = _a.sent();
                res.json({
                    status: 200,
                    data: updatedCategory,
                    message: 'success',
                });
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.json({
                    status: 404,
                    message: "failed, ".concat(err_4.message),
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// delete category by id
categoryRoutes.delete('/:id', authentication_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedCategory, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, category.deleteCategoryById(req.params.id)];
            case 1:
                deletedCategory = _a.sent();
                res.json({
                    status: 200,
                    data: deletedCategory,
                    message: 'success',
                });
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.json({
                    status: 404,
                    message: "failed, ".concat(err_5.message),
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = categoryRoutes;
