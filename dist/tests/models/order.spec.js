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
var order_1 = __importDefault(require("../../models/order"));
var product_1 = __importDefault(require("../../models/product"));
var category_1 = __importDefault(require("../../models/category"));
var user_1 = __importDefault(require("../../models/user"));
var database_1 = __importDefault(require("../../database"));
/***** variables *****/
var orderModel = new order_1.default();
var productModel = new product_1.default();
var categoryModel = new category_1.default();
var userModel = new user_1.default();
/***** test cases *****/
// Test Order Model
describe('Test Order Model', function () {
    // test methods defination
    describe('test methods defination', function () {
        it('Get Many Orders', function () {
            expect(orderModel.getAllOrders).toBeDefined();
        });
        it('Get One Orders', function () {
            expect(orderModel.getOrderById).toBeDefined();
        });
        it('Create Orders', function () {
            expect(orderModel.createNewOrder).toBeDefined();
        });
        it('Update Orders', function () {
            expect(orderModel.updateOrderById).toBeDefined();
        });
        it('Delete Orders', function () {
            expect(orderModel.deleteOrderById).toBeDefined();
        });
    });
    //   test functionality
    describe('test functionality', function () {
        var user = {
            email: 'menna@gmail.com',
            password: '123',
            first_name: 'menna',
            last_name: 'omar',
        };
        var category = {
            name: 'Electronics-test',
        };
        var product = {
            name: 'product-test',
            price: 20000,
        };
        var order = {
            status: 'active',
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
            var connection, sql, sql2, sql3, sql4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'DELETE FROM orders;';
                        sql2 = 'DELETE FROM products;';
                        sql3 = 'DELETE FROM categories;';
                        sql4 = 'DELETE FROM users;';
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, connection.query(sql2)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, connection.query(sql3)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, connection.query(sql4)];
                    case 5:
                        _a.sent();
                        connection.release();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Create Order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdProduct, createdUser, createdOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.createNewProduct(__assign({}, product))];
                    case 1:
                        createdProduct = _a.sent();
                        product.id = createdProduct.id;
                        return [4 /*yield*/, userModel.createNewUser(__assign({}, user))];
                    case 2:
                        createdUser = _a.sent();
                        user.id = createdUser.id;
                        return [4 /*yield*/, orderModel.createNewOrder(__assign(__assign({}, order), { user_id: user.id }))];
                    case 3:
                        createdOrder = _a.sent();
                        order.id = createdOrder.id;
                        expect(createdOrder.id).toEqual(order.id);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Get Many Orders', function () { return __awaiter(void 0, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.getAllOrders()];
                    case 1:
                        orders = _a.sent();
                        expect(orders.length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Get One Order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var returnedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.getOrderById(order.id)];
                    case 1:
                        returnedOrder = _a.sent();
                        expect(returnedOrder.id).toBe(order.id);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Get Details For One Order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var returnedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.getProductsInOrder(order.id)];
                    case 1:
                        returnedOrder = _a.sent();
                        expect(returnedOrder).not.toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        // it('Update Order', async () => {
        //   const updatedOrder = await orderModel.updateOrderById({
        //     ...order,
        //     // status: status_type.complete,
        //   })
        //   expect(updatedOrder.id).toBe(order.id)
        // })
        it('Delete Order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var deletedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.deleteOrderById(order.id)];
                    case 1:
                        deletedOrder = _a.sent();
                        expect(deletedOrder.id).toBe(order.id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
