import jwt from "jsonwebtoken";
import { IUser } from "../models/User";
import "dotenv/config";
import { saveRefreshTokenService } from "../services/authService";

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || "";
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET || "";

interface TokenPayload {
  id: string;
  email: string;
}

const generateToken = (user: IUser): string => {
  const payload: TokenPayload = {
    id: user.id,
    email: user.email,
  };
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
};

export const generateRefreshToken = async (user: IUser): Promise<string> => {
  const payload: TokenPayload = {
    id: user.id,
    email: user.email,
  };
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  await saveRefreshTokenService(user.id, refreshToken);
  return refreshToken;
};

export { generateToken };
