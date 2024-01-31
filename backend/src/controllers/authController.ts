import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  editProfileService,
  refreshAccessTokenService,
  getAllUsersService,
} from "../services/authService";
import errorHandlerLogin from "../utils/errorHandles.ts/errorHandleLogin";
import errorHandlerRegister from "../utils/errorHandles.ts/errorHandleRegister";
import {
  createChannelService,
  getAllChannelsService,
  getChannelByIdService,
  joinChannelService,
} from "../services/channelService";
import errorHandlerChannel from "../utils/errorHandles.ts/errorHandleChannel";
import { getMessagesByChannelIdService } from "../services/messageService";

export const register = async (req: Request, res: Response) => {
  try {
    const { accessToken, refreshToken, user } = await registerUser(req.body);
    res.json({
      message: "Register successfully",
      data: { accessToken, refreshToken, user },
    });
  } catch (error) {
    errorHandlerRegister(res, error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { accessToken, refreshToken, user } = await loginUser(req.body);
    res.json({
      message: "Login successfully",
      data: { accessToken, refreshToken, user },
    });
  } catch (error) {
    errorHandlerLogin(res, error);
  }
};

export const editUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const userData = req.body;

    const user = await editProfileService(userId, userData);

    res.json({ message: "Profile updated successfully", data: user });
  } catch (error: any) {
    console.error("Error updating profile:", error);
    const status = error.status || 500;
    res
      .status(status)
      .json({ message: error.message || "Internal Server Error" });
  }
};

export const createChannel = async (req: Request, res: Response) => {
  try {
    const channelData = {
      ...req.body,
    };

    const newChannel = await createChannelService(channelData);
    res.json({ message: "Channel created successfully", data: newChannel });
  } catch (error: any) {
    errorHandlerChannel(res, error);
  }
};

export const getAllChannels = async (req: Request, res: Response) => {
  try {
    const channels = await getAllChannelsService();
    res.json({ message: "Get all channels successfully", data: channels });
  } catch (error: any) {
    console.error("Error getting channels:", error);
    const status = error.status || 500;
    res
      .status(status)
      .json({ message: error.message || "Internal Server Error" });
  }
};

export const getChannelById = async (req: Request, res: Response) => {
  try {
    const { channelId } = req.params;
    const channel = await getChannelByIdService(channelId);
    if (!channel) {
      res.status(404).json({ error: "Channel not found" });
      return;
    }
    res.status(200).json(channel);
  } catch (error) {
    console.error("Error fetching channel by channelId:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const joinChannel = async (req: Request, res: Response) => {
  const { memberId, channelId } = req.body;

  try {
    await joinChannelService(memberId, channelId);

    res.status(200).json({ message: "User joined the channel successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getMessagesByChannelId = async (req: Request, res: Response) => {
  try {
    const { channelId } = req.params;
    const messages = await getMessagesByChannelIdService(channelId);
    res.json(messages);
  } catch (error) {
    console.error("Error getting messages by channelId:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;

  try {
    const newAccessToken = await refreshAccessTokenService(refreshToken);

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Error refreshing access token:", error);
    res.status(401).json({ error: "Invalid refresh token" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    res.json({ message: "Get all users successfully", data: users });
  } catch (error: any) {
    console.error("Error getting users:", error);
    const status = error.status || 500;
    res
      .status(status)
      .json({ message: error.message || "Internal Server Error" });
  }
};
