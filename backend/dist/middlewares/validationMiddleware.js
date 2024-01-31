"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidationMiddleware = void 0;
const registerValidation_1 = __importDefault(require("../validations/registerValidation"));
const registerValidationMiddleware = (req, res, next) => {
    const { errors, isValid } = (0, registerValidation_1.default)(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    next();
};
exports.registerValidationMiddleware = registerValidationMiddleware;
