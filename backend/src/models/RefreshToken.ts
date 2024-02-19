import mongoose, { Document, Schema } from "mongoose";

export interface IRefreshToken extends Document {
  userId: string;
  refreshToken: string;
  createdAt: Date;
}

const refreshTokenSchema: Schema<IRefreshToken> = new mongoose.Schema({
  userId: { type: String, required: true },
  refreshToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const RefreshToken = mongoose.model<IRefreshToken>(
  "RefreshToken",
  refreshTokenSchema
);

export default RefreshToken;
