import * as chatActionTypes from "../actionTypes/chatActionTypes";
import { Dispatch } from "redux";
import axios from "axios";
import {
  createChannelApi,
  getAllChannelApi,
  getChannelByIdApi,
  getMessageByChannelApi,
  joinChannelApi,
} from "../../apis/authApi";

export const createChannel =
  (channelName: string, channelDesc: string, inviteMember: string[]) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: chatActionTypes.CREATE_CHANNEL_REQUEST });
      const response = await createChannelApi(
        channelName,
        channelDesc,
        inviteMember
      );
      dispatch({
        type: chatActionTypes.CREATE_CHANNEL_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        dispatch({
          type: chatActionTypes.CREATE_CHANNEL_FAIL,
          payload: error.response.data,
        });
        throw error;
      }
    }
  };

export const getAllChannels = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: chatActionTypes.GET_ALL_CHANNELS_REQUEST });

    const response = await getAllChannelApi();

    dispatch({
      type: chatActionTypes.GET_ALL_CHANNELS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      dispatch({
        type: chatActionTypes.GET_ALL_CHANNELS_FAIL,
        payload: error.response.data,
      });
      throw error;
    }
  }
};

export const getChannelById =
  (channelId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: chatActionTypes.GET_SELECTED_CHANNEL_REQUEST });

      const response = await getChannelByIdApi(channelId);

      dispatch({
        type: chatActionTypes.GET_SELECTED_CHANNEL_SUCCESS,
        payload: response,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        dispatch({
          type: chatActionTypes.GET_SELECTED_CHANNEL_FAIL,
          payload: error.response.data,
        });
        throw error;
      }
    }
  };

export const joinChannel =
  (channelId: string, memberId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: chatActionTypes.JOIN_CHANNEL_REQUEST });

      const response = await joinChannelApi(channelId, memberId);

      dispatch({
        type: chatActionTypes.JOIN_CHANNEL_SUCCESS,
        payload: response,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        dispatch({
          type: chatActionTypes.JOIN_CHANNEL_FAIL,
          payload: error.response.data,
        });
        throw error;
      }
    }
  };

export const getMessageByChannel =
  (channelId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: chatActionTypes.GET_MESSAGES_REQUEST });

      const response = await getMessageByChannelApi(channelId);

      dispatch({
        type: chatActionTypes.GET_MESSAGES_SUCCESS,
        payload: response,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        dispatch({
          type: chatActionTypes.GET_MESSAGES_FAIL,
          payload: error.response.data,
        });
        throw error;
      }
    }
  };
