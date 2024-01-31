import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  avatar?: string;
  email: string;
  password: string;
  name?: string;
  bio?: string;
  phone?: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  avatar: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  bio: { type: String },
  phone: { type: String },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
