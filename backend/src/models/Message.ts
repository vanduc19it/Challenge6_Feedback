import mongoose, { Document, Schema, Types } from "mongoose";
import { IUser } from "./User";

export interface IMessage extends Document {
  messageId: string;
  senderId: Types.ObjectId;
  content: string;
  date: Date;
  channelId: string;
}

const messageSchema: Schema<IMessage> = new mongoose.Schema({
  messageId: { type: String, required: true },
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
  channelId: { type: String, required: true },
});

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;
