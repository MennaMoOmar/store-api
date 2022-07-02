"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/***** imports *****/
var express_1 = require("express");
var users_1 = __importDefault(require("./api/users"));
var categories_1 = __importDefault(require("./api/categories"));
var products_1 = __importDefault(require("./api/products"));
var orders_1 = __importDefault(require("./api/orders"));
/***** variables *****/
var routes = (0, express_1.Router)();
routes.use('/user', users_1.default);
routes.use('/category', categories_1.default);
routes.use('/product', products_1.default);
routes.use('/order', orders_1.default);
exports.default = routes;
