import { Document } from "mongoose";
import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import { LoginUserData } from "../services/authService";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import "dotenv/config";
import { HttpStatusCode } from "../utils/HttpStatusCode";

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || "";

export const checkPassword = async (userData: LoginUserData) => {
  try {
    const { email, password } = userData;
    const user: IUser | null = await User.findOne({ email: email });

    if (!user) {
      return false;
    }

    const isPasswordMatch: boolean = await bcrypt.compare(
      password,
      user.password
    );

    return isPasswordMatch;
  } catch (error) {
    throw error;
  }
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(HttpStatusCode.Unauthorized)
      .json({ message: "Unauthorized: Token not provided" });
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .status(HttpStatusCode.Forbidden)
        .json({ message: "Forbidden: Invalid token" });
    }
    next();
  });
};
