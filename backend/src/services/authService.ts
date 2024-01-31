import bcrypt from "bcrypt";
import { Document } from "mongoose";
import User, { IUser } from "../models/User";
import { generateRefreshToken, generateToken } from "../config/jwt";
import { checkPassword } from "../middlewares/authMiddleware";
import RefreshToken, { IRefreshToken } from "../models/RefreshToken";
import jwt from "jsonwebtoken";

interface RegisterUserData {
  email: string;
  password: string;
  name?: string;
  bio?: string;
  phone?: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

interface AuthResponse {
  success?: boolean;
  accessToken?: string;
  refreshToken?: string;
  user?: IUser;
  newUser?: IUser;
}

const registerUser = async (
  userData: RegisterUserData
): Promise<AuthResponse> => {
  try {
    const { email, password } = userData;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw { email: "Email already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      name: "",
      bio: "",
      avatar: "",
      phone: "",
    });

    await newUser.save();

    const accessToken = generateToken(newUser);

    const refreshToken = await generateRefreshToken(newUser);

    return {
      accessToken,
      refreshToken,
      user: { ...newUser.toJSON(), password: "" },
    };
  } catch (error) {
    throw error;
  }
};

const loginUser = async (userData: LoginUserData): Promise<AuthResponse> => {
  try {
    const { email } = userData;

    const user = await User.findOne({ email: email }, "-password");

    if (!user) {
      throw { email: "Email not found" };
    }

    const isPasswordMatch: boolean = await checkPassword(userData);

    if (!isPasswordMatch) {
      throw { password: "Incorrect password" };
    }

    const accessToken = generateToken(user);

    const refreshToken = await generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
      user: { ...user.toJSON(), password: "" },
    };
  } catch (error) {
    throw error;
  }
};

const editProfileService = async (
  userId: string,
  userData: any
): Promise<{ accessToken: string; refreshToken: string; user: IUser }> => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw { message: "User not found", status: 404 };
    }

    if (userData.password !== undefined && userData.password !== "") {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      user.password = hashedPassword;
    }
    user.avatar = userData.avatar || user.avatar;
    user.name = userData.name || user.name;
    user.bio = userData.bio || user.bio;
    user.phone = userData.phone || user.phone;

    await user.save();

    const accessToken = generateToken(user);
    const refreshToken = await generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
      user: { ...user.toJSON(), password: "" },
    };
  } catch (error) {
    throw error;
  }
};

export const saveRefreshTokenService = async (
  userId: string,
  refreshToken: string
): Promise<IRefreshToken> => {
  try {
    const existingRefreshToken = await RefreshToken.findOne({ userId });

    if (existingRefreshToken) {
      existingRefreshToken.refreshToken = refreshToken;
      await existingRefreshToken.save();
      return existingRefreshToken;
    } else {
      const newRefreshToken = new RefreshToken({
        userId,
        refreshToken,
      });

      await newRefreshToken.save();
      return newRefreshToken;
    }
  } catch (error) {
    throw error;
  }
};

export const refreshAccessTokenService = async (
  refreshToken: string
): Promise<string> => {
  try {
    const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET || "";
    const decodedToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as {
      id: string;
      email: string;
    };

    const user = await User.findById(decodedToken.id);

    if (!user) {
      throw new Error("User not found");
    }

    const newAccessToken = generateToken(user);

    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

export const getAllUsersService = async (): Promise<IUser[]> => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
};

export { registerUser, loginUser, editProfileService };
