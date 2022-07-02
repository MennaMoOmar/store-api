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
var express_1 = require("express");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authentication_1 = __importDefault(require("../../middlewares/authentication"));
var user_1 = __importDefault(require("../../models/user"));
var config_1 = __importDefault(require("../../config"));
/***** variables *****/
var user = new user_1.default();
/***** Routes *****/
var userRoutes = (0, express_1.Router)();
/***** Api *****/
// get all users
userRoutes.get('/', authentication_1.default, function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user.getAllUsers()];
            case 1:
                users = _a.sent();
                res.json({
                    status: 200,
                    data: users,
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
// get one user by id
userRoutes.get('/:id', authentication_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var selectedUser, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user.getUserById(req.params.id)];
            case 1:
                selectedUser = _a.sent();
                res.json({
                    status: 200,
                    data: selectedUser,
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
// create new user
userRoutes.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user.createNewUser(req.body)];
            case 1:
                newUser = _a.sent();
                res.json({
                    status: 200,
                    data: newUser,
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
// update user
userRoutes.patch('/:id', authentication_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedUser, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user.updateUserById(req.body)];
            case 1:
                updatedUser = _a.sent();
                res.json({
                    status: 200,
                    data: updatedUser,
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
// delete user by id
userRoutes.delete('/:id', authentication_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedUser, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user.deleteUserById(req.params.id)];
            case 1:
                deletedUser = _a.sent();
                res.json({
                    status: 200,
                    data: deletedUser,
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
// login
userRoutes.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, loginUser, token, err_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, user.login(email, password)];
            case 1:
                loginUser = _b.sent();
                token = jsonwebtoken_1.default.sign({ user: user }, config_1.default.tokenSecret);
                if (!user) {
                    return [2 /*return*/, res.json({
                            status: 401,
                            message: 'wrong username or password',
                        })];
                }
                else {
                    res.json({
                        status: 200,
                        data: __assign(__assign({}, loginUser), { token: token }),
                        message: 'success',
                    });
                }
                return [3 /*break*/, 3];
            case 2:
                err_6 = _b.sent();
                res.json({
                    status: 404,
                    message: "failed, ".concat(err_6.message),
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = userRoutes;
