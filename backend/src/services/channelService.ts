import Channel, { IChannel } from "../models/Channel";
import { v4 as uuidv4 } from "uuid";
import User, { IUser } from "../models/User";
import Message, { IMessage } from "../models/Message";
export const createChannelService = async (channelData: {
  name: string;
  description: string;
  creatorId: string;
  inviteMember: string[];
}): Promise<IChannel> => {
  console.log(channelData);
  try {
    const existingChannel = await Channel.findOne({ name: channelData.name });

    if (existingChannel) {
      throw { channel: "Channel already exists" };
    }
    const newChannel = new Channel({
      name: channelData.name,
      description: channelData.description,
      members: [channelData.creatorId, ...channelData.inviteMember],
      channelId: uuidv4(),
      createdAt: new Date(),
    });

    await newChannel.save();
    return newChannel;
  } catch (error) {
    throw error;
  }
};

export const getAllChannelsService = async (): Promise<IChannel[]> => {
  try {
    const channels = await Channel.find().sort({ createdAt: -1 });
    return channels;
  } catch (error) {
    throw error;
  }
};

export interface IChannelDetail extends Document {
  name: string;
  description: string;
  members: IUser[] | null;
  channelId: string;
  createdAt: Date;
}

export const getChannelByIdService = async (
  channelId: string
): Promise<IChannelDetail | null> => {
  try {
    const channel = await Channel.findOne({ channelId });

    if (!channel) {
      return null;
    }
    const membersWithDetails = await Promise.all(
      channel.members.map(async (memberId) => {
        const member = (await User.findOne({ _id: memberId })) as IUser;
        return member;
      })
    );

    const updatedChannel: IChannelDetail = {
      ...channel.toObject(),
      members: membersWithDetails,
    };

    return updatedChannel;
  } catch (error) {
    throw error;
  }
};

export const joinChannelService = async (
  memberId: string,
  channelId: string
): Promise<void> => {
  try {
    const channel = await Channel.findOne({ channelId });

    if (!channel) {
      throw { message: "Channel not found." };
    }
    if (!channel.members.includes(memberId)) {
      channel.members.push(memberId);
    }

    await channel.save();
  } catch (error) {
    throw error;
  }
};
