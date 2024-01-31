import axios from "axios";
import { getDataFromLocalStorage } from "../utils/localStorage";
import { UserEdit } from "../interfaces/interfaces";
import api from "../utils/axiosInterceptors";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const registerApi = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${URL_SERVER}/auth/register`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    {
      throw error;
    }
  }
};

export const loginApi = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${URL_SERVER}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    {
      throw error;
    }
  }
};

export const editProfileApi = async (userData: UserEdit) => {
  try {
    const { userInfo } = getDataFromLocalStorage("userReducer");
    const token = userInfo.accessToken;
    const response = await api.put(
      `/edit-profile/${userInfo?.user?._id}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    {
      throw error;
    }
  }
};

export const createChannelApi = async (
  channelName: string,
  channelDesc: string,
  inviteMember: string[]
) => {
  console.log(inviteMember);
  try {
    const { userInfo } = getDataFromLocalStorage("userReducer");
    const token = userInfo.accessToken;
    const creatorId = userInfo?.user?._id;
    const response = await api.post(
      `/channel/create`,
      {
        name: channelName,
        description: channelDesc,
        creatorId,
        inviteMember,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    {
      throw error;
    }
  }
};

export const getAllChannelApi = async () => {
  try {
    const { userInfo } = getDataFromLocalStorage("userReducer");
    const token = userInfo.accessToken;
    const response = await api.get(`/channel/get-all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    {
      throw error;
    }
  }
};

export const getChannelByIdApi = async (channelId: string) => {
  try {
    const { userInfo } = getDataFromLocalStorage("userReducer");
    const token = userInfo.accessToken;
    const response = await api.get(`/channel/get-by-id/${channelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    {
      throw error;
    }
  }
};

export const joinChannelApi = async (channelId: string, memberId: string) => {
  try {
    const { userInfo } = getDataFromLocalStorage("userReducer");
    const token = userInfo.accessToken;
    const response = await api.post(
      `/channel/join`,
      { memberId, channelId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    {
      throw error;
    }
  }
};

export const getMessageByChannelApi = async (channelId: string) => {
  try {
    const { userInfo } = getDataFromLocalStorage("userReducer");
    const token = userInfo.accessToken;
    const response = await api.get(`/message/get-by-channel/${channelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    {
      throw error;
    }
  }
};

export const refreshTokenApi = async () => {
  console.log("abcbcb");
  try {
    const { userInfo } = getDataFromLocalStorage("userReducer");
    const refreshToken = userInfo.refreshToken;
    const response = await axios.post(`${URL_SERVER}/auth/refresh-token`, {
      refreshToken,
    });

    return response.data;
  } catch (error) {
    {
      throw error;
    }
  }
};

export const getAllUserApi = async () => {
  try {
    const { userInfo } = getDataFromLocalStorage("userReducer");
    const token = userInfo.accessToken;
    const response = await api.get(`/user/get-all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    {
      throw error;
    }
  }
};
