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
exports.getAllUsers = exports.refreshAccessToken = exports.getMessagesByChannelId = exports.joinChannel = exports.getChannelById = exports.getAllChannels = exports.createChannel = exports.editUserProfile = exports.login = exports.register = void 0;
const authService_1 = require("../services/authService");
const errorHandleLogin_1 = __importDefault(require("../utils/errorHandles.ts/errorHandleLogin"));
const errorHandleRegister_1 = __importDefault(require("../utils/errorHandles.ts/errorHandleRegister"));
const channelService_1 = require("../services/channelService");
const errorHandleChannel_1 = __importDefault(require("../utils/errorHandles.ts/errorHandleChannel"));
const messageService_1 = require("../services/messageService");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accessToken, refreshToken, user } = yield (0, authService_1.registerUser)(req.body);
        res.json({
            message: "Register successfully",
            data: { accessToken, refreshToken, user },
        });
    }
    catch (error) {
        (0, errorHandleRegister_1.default)(res, error);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accessToken, refreshToken, user } = yield (0, authService_1.loginUser)(req.body);
        res.json({
            message: "Login successfully",
            data: { accessToken, refreshToken, user },
        });
    }
    catch (error) {
        (0, errorHandleLogin_1.default)(res, error);
    }
});
exports.login = login;
const editUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const user = yield (0, authService_1.editProfileService)(userId, userData);
        res.json({ message: "Profile updated successfully", data: user });
    }
    catch (error) {
        console.error("Error updating profile:", error);
        const status = error.status || 500;
        res
            .status(status)
            .json({ message: error.message || "Internal Server Error" });
    }
});
exports.editUserProfile = editUserProfile;
const createChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const channelData = Object.assign({}, req.body);
        const newChannel = yield (0, channelService_1.createChannelService)(channelData);
        res.json({ message: "Channel created successfully", data: newChannel });
    }
    catch (error) {
        (0, errorHandleChannel_1.default)(res, error);
    }
});
exports.createChannel = createChannel;
const getAllChannels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const channels = yield (0, channelService_1.getAllChannelsService)();
        res.json({ message: "Get all channels successfully", data: channels });
    }
    catch (error) {
        console.error("Error getting channels:", error);
        const status = error.status || 500;
        res
            .status(status)
            .json({ message: error.message || "Internal Server Error" });
    }
});
exports.getAllChannels = getAllChannels;
const getChannelById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { channelId } = req.params;
        const channel = yield (0, channelService_1.getChannelByIdService)(channelId);
        if (!channel) {
            res.status(404).json({ error: "Channel not found" });
            return;
        }
        res.status(200).json(channel);
    }
    catch (error) {
        console.error("Error fetching channel by channelId:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getChannelById = getChannelById;
const joinChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { memberId, channelId } = req.body;
    try {
        yield (0, channelService_1.joinChannelService)(memberId, channelId);
        res.status(200).json({ message: "User joined the channel successfully." });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});
exports.joinChannel = joinChannel;
const getMessagesByChannelId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { channelId } = req.params;
        const messages = yield (0, messageService_1.getMessagesByChannelIdService)(channelId);
        res.json(messages);
    }
    catch (error) {
        console.error("Error getting messages by channelId:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getMessagesByChannelId = getMessagesByChannelId;
const refreshAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.body.refreshToken;
    try {
        const newAccessToken = yield (0, authService_1.refreshAccessTokenService)(refreshToken);
        res.json({ accessToken: newAccessToken });
    }
    catch (error) {
        console.error("Error refreshing access token:", error);
        res.status(401).json({ error: "Invalid refresh token" });
    }
});
exports.refreshAccessToken = refreshAccessToken;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, authService_1.getAllUsersService)();
        res.json({ message: "Get all users successfully", data: users });
    }
    catch (error) {
        console.error("Error getting users:", error);
        const status = error.status || 500;
        res
            .status(status)
            .json({ message: error.message || "Internal Server Error" });
    }
});
exports.getAllUsers = getAllUsers;
