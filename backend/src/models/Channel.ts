import mongoose, { Document, Schema } from "mongoose";
import Message, { IMessage } from "./Message";

export interface IChannel extends Document {
  name: string;
  description: string;
  members: string[];
  channelId: string;
  createdAt: Date;
}

const channelSchema: Schema<IChannel> = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: String, required: true }],
  channelId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Channel = mongoose.model<IChannel>("Channel", channelSchema);

export default Channel;
