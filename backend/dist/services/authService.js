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
exports.editProfileService = exports.loginUser = exports.registerUser = exports.getAllUsersService = exports.refreshAccessTokenService = exports.saveRefreshTokenService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../config/jwt");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const RefreshToken_1 = __importDefault(require("../models/RefreshToken"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = userData;
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            throw { email: "Email already exists" };
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.default({
            email,
            password: hashedPassword,
            name: "",
            bio: "",
            avatar: "",
            phone: "",
        });
        yield newUser.save();
        const accessToken = (0, jwt_1.generateToken)(newUser);
        const refreshToken = yield (0, jwt_1.generateRefreshToken)(newUser);
        return {
            accessToken,
            refreshToken,
            user: Object.assign(Object.assign({}, newUser.toJSON()), { password: "" }),
        };
    }
    catch (error) {
        throw error;
    }
});
exports.registerUser = registerUser;
const loginUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = userData;
        const user = yield User_1.default.findOne({ email: email }, "-password");
        if (!user) {
            throw { email: "Email not found" };
        }
        const isPasswordMatch = yield (0, authMiddleware_1.checkPassword)(userData);
        if (!isPasswordMatch) {
            throw { password: "Incorrect password" };
        }
        const accessToken = (0, jwt_1.generateToken)(user);
        const refreshToken = yield (0, jwt_1.generateRefreshToken)(user);
        return {
            accessToken,
            refreshToken,
            user: Object.assign(Object.assign({}, user.toJSON()), { password: "" }),
        };
    }
    catch (error) {
        throw error;
    }
});
exports.loginUser = loginUser;
const editProfileService = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(userId);
        if (!user) {
            throw { message: "User not found", status: 404 };
        }
        if (userData.password !== undefined && userData.password !== "") {
            const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
            user.password = hashedPassword;
        }
        user.avatar = userData.avatar || user.avatar;
        user.name = userData.name || user.name;
        user.bio = userData.bio || user.bio;
        user.phone = userData.phone || user.phone;
        yield user.save();
        const accessToken = (0, jwt_1.generateToken)(user);
        const refreshToken = yield (0, jwt_1.generateRefreshToken)(user);
        return {
            accessToken,
            refreshToken,
            user: Object.assign(Object.assign({}, user.toJSON()), { password: "" }),
        };
    }
    catch (error) {
        throw error;
    }
});
exports.editProfileService = editProfileService;
const saveRefreshTokenService = (userId, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingRefreshToken = yield RefreshToken_1.default.findOne({ userId });
        if (existingRefreshToken) {
            existingRefreshToken.refreshToken = refreshToken;
            yield existingRefreshToken.save();
            return existingRefreshToken;
        }
        else {
            const newRefreshToken = new RefreshToken_1.default({
                userId,
                refreshToken,
            });
            yield newRefreshToken.save();
            return newRefreshToken;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.saveRefreshTokenService = saveRefreshTokenService;
const refreshAccessTokenService = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
        const decodedToken = jsonwebtoken_1.default.verify(refreshToken, REFRESH_TOKEN_SECRET);
        const user = yield User_1.default.findById(decodedToken.id);
        if (!user) {
            throw new Error("User not found");
        }
        const newAccessToken = (0, jwt_1.generateToken)(user);
        return newAccessToken;
    }
    catch (error) {
        throw error;
    }
});
exports.refreshAccessTokenService = refreshAccessTokenService;
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        return users;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllUsersService = getAllUsersService;
