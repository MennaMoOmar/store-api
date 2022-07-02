"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
// validate Token Middleware
var authentication = function (req, _res, next) {
    try {
        // get authHeader
        var authHeader = req.get('Authorization');
        if (authHeader) {
            var bearer = authHeader.split(' ')[0].toLowerCase();
            var token = authHeader.split(' ')[1];
            if (token && bearer === 'bearer') {
                var decode = jsonwebtoken_1.default.verify(token, config_1.default.tokenSecret);
                if (decode) {
                    next();
                }
                else {
                    var error = new Error('Error Login');
                    next(error);
                }
            }
            else {
                var error = new Error('Error Login');
                next(error);
            }
        }
        else {
            var error = new Error('Error Login');
            next(error);
        }
    }
    catch (err) {
        var error = new Error('Error Login');
        next(error);
    }
};
exports.default = authentication;
