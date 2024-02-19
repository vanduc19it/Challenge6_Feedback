export interface UserInfo {
  accessToken: string;
  refreshToken: string;
  user: {
    avatar: string;
    bio: string;
    email: string;
    name: string;
    phone: string;
  };
}

export interface User {
  _id: string;
  avatar: string;
  bio: string;
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface Channel {
  _id: string;
  name: string;
  description: string;
  channelId: string;
  members: User[];
}

export interface UserEdit {
  avatar: string;
  bio: string;
  name: string;
  phone: string;
  password: string;
}

export interface ChannelInfo {
  id: string;
  name: string;
  description: string;
}

export interface MessagesProps {
  channelId: string;
  messageId: string;
  sender: User;
  content: string;
  date: Date;
}
