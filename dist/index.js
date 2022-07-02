"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
/***** imports *****/
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var routes_1 = __importDefault(require("./routes"));
var config_1 = __importDefault(require("./config"));
/***** variables *****/
var PORT = config_1.default.port || 3000;
var app = (0, express_1.default)();
/***** middlewares *****/
// middleware to parse incoming requests
app.use(express_1.default.json());
// HTTP request logger middleware
app.use((0, morgan_1.default)('common'));
// HTTP security middleware
app.use((0, helmet_1.default)());
// Rate limit middleware
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after an 15 minutes',
}));
/***** Routes *****/
// welcome route
app.get('/', function (req, res) {
    res.statusCode = 200;
    res.json({
        status: 200,
        message: 'Welcome in Store API',
    });
});
// Main Route
app.use('/api', routes_1.default);
app.use(function (_req, res) {
    res.status(404).json({
        message: 'Invalid URL',
    });
});
/***** listen server *****/
app.listen(PORT, function () {
    console.log("Server running on prot:".concat(PORT));
});
exports.default = app;
