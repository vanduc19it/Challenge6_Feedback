"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const channelSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: String, required: true }],
    channelId: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});
const Channel = mongoose_1.default.model("Channel", channelSchema);
exports.default = Channel;
