"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinChannelService = exports.getChannelByIdService = exports.getAllChannelsService = exports.createChannelService = void 0;
const Channel_1 = __importDefault(require("../models/Channel"));
const uuid_1 = require("uuid");
const User_1 = __importDefault(require("../models/User"));
const createChannelService = (channelData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(channelData);
    try {
        const existingChannel = yield Channel_1.default.findOne({ name: channelData.name });
        if (existingChannel) {
            throw { channel: "Channel already exists" };
        }
        const newChannel = new Channel_1.default({
            name: channelData.name,
            description: channelData.description,
            members: [channelData.creatorId, ...channelData.inviteMember],
            channelId: (0, uuid_1.v4)(),
            createdAt: new Date(),
        });
        yield newChannel.save();
        return newChannel;
    }
    catch (error) {
        throw error;
    }
});
exports.createChannelService = createChannelService;
const getAllChannelsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const channels = yield Channel_1.default.find().sort({ createdAt: -1 });
        return channels;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllChannelsService = getAllChannelsService;
const getChannelByIdService = (channelId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const channel = yield Channel_1.default.findOne({ channelId });
        if (!channel) {
            return null;
        }
        const membersWithDetails = yield Promise.all(channel.members.map((memberId) => __awaiter(void 0, void 0, void 0, function* () {
            const member = (yield User_1.default.findOne({ _id: memberId }));
            return member;
        })));
        const updatedChannel = Object.assign(Object.assign({}, channel.toObject()), { members: membersWithDetails });
        return updatedChannel;
    }
    catch (error) {
        throw error;
    }
});
exports.getChannelByIdService = getChannelByIdService;
const joinChannelService = (memberId, channelId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const channel = yield Channel_1.default.findOne({ channelId });
        if (!channel) {
            throw { message: "Channel not found." };
        }
        if (!channel.members.includes(memberId)) {
            channel.members.push(memberId);
        }
        yield channel.save();
    }
    catch (error) {
        throw error;
    }
});
exports.joinChannelService = joinChannelService;
