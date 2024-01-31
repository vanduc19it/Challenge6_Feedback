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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.checkPassword = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const HttpStatusCode_1 = require("../utils/HttpStatusCode");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
const checkPassword = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = userData;
        const user = yield User_1.default.findOne({ email: email });
        if (!user) {
            return false;
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
        return isPasswordMatch;
    }
    catch (error) {
        throw error;
    }
});
exports.checkPassword = checkPassword;
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res
            .status(HttpStatusCode_1.HttpStatusCode.Unauthorized)
            .json({ message: "Unauthorized: Token not provided" });
    }
    jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res
                .status(HttpStatusCode_1.HttpStatusCode.Forbidden)
                .json({ message: "Forbidden: Invalid token" });
        }
        next();
    });
};
exports.authenticateToken = authenticateToken;
