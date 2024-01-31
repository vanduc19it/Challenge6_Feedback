"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const validateRegisterInput = (data) => {
    const errors = {};
    if (!validator_1.default.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = "Password is required";
    }
    else if (!validator_1.default.isLength(data.password, { min: 6 }) ||
        !/(?=.*[a-z])/.test(data.password) ||
        !/(?=.*[A-Z])/.test(data.password) ||
        !/(?=.*\d)/.test(data.password)) {
        errors.password =
            "Password must be at least 6 characters and include at least one uppercase letter, one lowercase letter, and one number";
    }
    return { errors, isValid: Object.keys(errors).length === 0 };
};
exports.default = validateRegisterInput;
