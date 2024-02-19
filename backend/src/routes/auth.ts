// auth.ts
import express, { Request, Response } from "express";
import {
  register,
  login,
  editUserProfile,
  createChannel,
  getAllChannels,
  getChannelById,
  joinChannel,
  getMessagesByChannelId,
  refreshAccessToken,
  getAllUsers,
} from "../controllers/authController";
import { registerValidationMiddleware } from "../middlewares/validationMiddleware";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", registerValidationMiddleware, register);

router.post("/login", login);

router.put("/edit-profile/:id", authenticateToken, editUserProfile);

router.get("/channel/get-all", authenticateToken, getAllChannels);
router.get("/channel/get-by-id/:channelId", authenticateToken, getChannelById);

router.post("/channel/create", authenticateToken, createChannel);
router.post("/channel/join", authenticateToken, joinChannel);
router.get(
  "/message/get-by-channel/:channelId",
  authenticateToken,
  getMessagesByChannelId
);
router.post("/refresh-token", refreshAccessToken);

router.get("/user/get-all", authenticateToken, getAllUsers);

export default router;
