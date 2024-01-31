import Message, { IMessage } from "../models/Message";

export const getMessagesByChannelIdService = async (
  channelId: string
): Promise<IMessage[]> => {
  try {
    const messages = await Message.find({ channelId }).populate("senderId");
    const modifiedMessages: any = messages.map((message) => {
      return {
        channelId: message.channelId,
        messageId: message.messageId,
        sender: message.senderId,
        content: message.content,
        date: message.date,
      };
    });

    return modifiedMessages;
  } catch (error) {
    throw error;
  }
};

export const saveMessageService = async (
  messageId: string,
  senderId: string,
  content: string,
  date: Date,
  channelId: string
): Promise<IMessage> => {
  try {
    const newMessage = new Message({
      messageId,
      senderId,
      content,
      date,
      channelId,
    });

    await newMessage.save();
    return newMessage;
  } catch (error) {
    throw error;
  }
};
