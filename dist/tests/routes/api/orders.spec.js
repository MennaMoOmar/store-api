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
var supertest_1 = __importDefault(require("supertest"));
var category_1 = __importDefault(require("../../../models/category"));
// import ProductModel from '../../../models/product'
var user_1 = __importDefault(require("../../../models/user"));
var index_1 = __importDefault(require("../../../index"));
var database_1 = __importDefault(require("../../../database"));
/***** variables *****/
var categoryModel = new category_1.default();
// const productModel = new ProductModel()
var userModel = new user_1.default();
var request = (0, supertest_1.default)(index_1.default);
var token = '';
/***** test cases *****/
describe('Order API Endpoints', function () {
    var user = {
        email: 'menna-test2@gmail.com',
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
        var connection, sql, sql2, sql3, sql4, sql5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    connection = _a.sent();
                    sql = 'DELETE FROM order_products;';
                    sql2 = 'DELETE FROM orders;';
                    sql3 = 'DELETE FROM products;';
                    sql4 = 'DELETE FROM categories;';
                    sql5 = 'DELETE FROM users;';
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
                    return [4 /*yield*/, connection.query(sql5)];
                case 6:
                    _a.sent();
                    connection.release();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Authenticate User', function () {
        it('Authenticate User', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdUser, res, userToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.createNewUser(user)];
                    case 1:
                        createdUser = _a.sent();
                        user.id = createdUser.id;
                        return [4 /*yield*/, request
                                .post('/api/user/login')
                                .set('Content-type', 'application/json')
                                .send({
                                email: 'menna-test2@gmail.com',
                                password: '123',
                            })];
                    case 2:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        userToken = res.body.data.token;
                        token = userToken;
                        user.id = res.body.data.id;
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('test API', function () {
        it('Create Order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/api/order')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))
                            .send(__assign(__assign({}, order), { user_id: user.id }))];
                    case 1:
                        res = _a.sent();
                        order.id = res.body.data.id;
                        expect(res.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        // it('Add Products To Order', async () => {
        //   const createdProduct = await productModel.createNewProduct({
        //     ...product,
        //   })
        //   product.id = createdProduct.id
        //   console.log(product.id)
        // const res = await request
        //   .post(`/api/order/${order.id}/product`)
        //   .set('Content-type', 'application/json')
        //   .set('Authorization', `Bearer ${token}`)
        //   .send([
        //     {
        //       product_id: product.id,
        //       quantity: 1,
        //     },
        //   ] as unknown as OrderType)
        // expect(res.status).toBe(200)
        // expect(res.body.data.length).toBe(1)
        // })
        it('Get All Order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get('/api/order')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.data.length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Get Order By Id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get("/api/order/".concat(order.id))
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.data.status).toBe('active');
                        return [2 /*return*/];
                }
            });
        }); });
        it('Update Order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .patch("/api/order/".concat(order.id))
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))
                            .send({
                            status: 'complete',
                        })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        // it('Delete Order', async () => {
        //   const res = await request
        //     .delete(`/api/order/${order.id}`)
        //     .set('Content-type', 'application/json')
        //     .set('Authorization', `Bearer ${token}`)
        //   expect(res.status).toBe(200)
        //   expect(res.body.data.id).toBe(order.id)
        // })
    });
});
