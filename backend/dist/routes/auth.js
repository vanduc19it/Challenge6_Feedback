"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// auth.ts
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post("/register", validationMiddleware_1.registerValidationMiddleware, authController_1.register);
router.post("/login", authController_1.login);
router.put("/edit-profile/:id", authMiddleware_1.authenticateToken, authController_1.editUserProfile);
router.get("/channel/get-all", authMiddleware_1.authenticateToken, authController_1.getAllChannels);
router.get("/channel/get-by-id/:channelId", authMiddleware_1.authenticateToken, authController_1.getChannelById);
router.post("/channel/create", authMiddleware_1.authenticateToken, authController_1.createChannel);
router.post("/channel/join", authMiddleware_1.authenticateToken, authController_1.joinChannel);
router.get("/message/get-by-channel/:channelId", authMiddleware_1.authenticateToken, authController_1.getMessagesByChannelId);
router.post("/refresh-token", authController_1.refreshAccessToken);
router.get("/user/get-all", authMiddleware_1.authenticateToken, authController_1.getAllUsers);
exports.default = router;
