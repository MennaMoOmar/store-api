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
var order_1 = __importDefault(require("../../models/order"));
/***** variables *****/
var order = new order_1.default();
/***** Routes *****/
var orderRoutes = (0, express_1.Router)();
/***** Api *****/
// get all orders
orderRoutes.get('/', authentication_1.default, function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order.getAllOrders()];
            case 1:
                orders = _a.sent();
                res.json({
                    status: 200,
                    data: orders,
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
// get order by id
orderRoutes.get('/:id', authentication_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var selectedOrder, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order.getOrderById(req.params.id)];
            case 1:
                selectedOrder = _a.sent();
                res.json({
                    status: 200,
                    data: selectedOrder,
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
// create new order
orderRoutes.post('/', authentication_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newOrder, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order.createNewOrder(req.body)];
            case 1:
                newOrder = _a.sent();
                res.json({
                    status: 200,
                    data: newOrder,
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
// update order
orderRoutes.patch('/:id', authentication_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedOrder, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order.updateOrderById(req.body)];
            case 1:
                updatedOrder = _a.sent();
                res.json({
                    status: 200,
                    data: updatedOrder,
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
// delete order by id
orderRoutes.delete('/:id', authentication_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedOrder, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order.deleteOrderById(req.params.id)];
            case 1:
                deletedOrder = _a.sent();
                res.json({
                    status: 200,
                    data: deletedOrder,
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
// add product to order
orderRoutes.post('/:id/product', authentication_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var prroductAddtedToOrder, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order.addProductToOrder(req.params.id, req.body)];
            case 1:
                prroductAddtedToOrder = _a.sent();
                res.json({
                    status: 200,
                    data: prroductAddtedToOrder,
                    message: 'success',
                });
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                res.json({
                    status: 404,
                    message: "failed, ".concat(err_6.message),
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// getProductsInOrder
orderRoutes.get('/details/:id', authentication_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productsInOrder, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order.getProductsInOrder(req.params.id)];
            case 1:
                productsInOrder = _a.sent();
                res.json({
                    status: 200,
                    data: productsInOrder,
                    message: 'success',
                });
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                res.json({
                    status: 404,
                    message: "failed, ".concat(err_7.message),
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = orderRoutes;
