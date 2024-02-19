import * as userActionTypes from "../actionTypes/userActionTypes";
import { Dispatch } from "redux";
import {
  editProfileApi,
  getAllUserApi,
  loginApi,
  refreshTokenApi,
  registerApi,
} from "../../apis/authApi";
import axios from "axios";
import { UserEdit } from "../../interfaces/interfaces";

export const register =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: userActionTypes.USER_REGISTER_REQUEST });

      const response = await registerApi(email, password);

      dispatch({
        type: userActionTypes.USER_REGISTER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        dispatch({
          type: userActionTypes.USER_REGISTER_FAIL,
          payload: error.response.data,
        });
        throw error;
      }
    }
  };

export const login =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: userActionTypes.USER_LOGIN_REQUEST });

      const response = await loginApi(email, password);

      dispatch({
        type: userActionTypes.USER_LOGIN_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        dispatch({
          type: userActionTypes.USER_LOGIN_FAIL,
          payload: error.response.data,
        });
        throw error;
      }
    }
  };

export const logout = () => async (dispatch: Dispatch) => {
  dispatch({ type: userActionTypes.USER_LOGOUT });
};

export const editProfile =
  (userData: UserEdit) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: userActionTypes.USER_EDIT_PROFILE_REQUEST });

      const response = await editProfileApi(userData);

      dispatch({
        type: userActionTypes.USER_EDIT_PROFILE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        dispatch({
          type: userActionTypes.USER_EDIT_PROFILE_FAIL,
          payload: error.response.data,
        });
        throw error;
      }
    }
  };

export const refreshAccessToken = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: userActionTypes.REFRESH_TOKEN_REQUEST });

    const response = await refreshTokenApi();
    dispatch({
      type: userActionTypes.REFRESH_TOKEN_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      dispatch({
        type: userActionTypes.REFRESH_TOKEN_FAIL,
        payload: error.response.data,
      });
      throw error;
    }
  }
};

export const getAllUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: userActionTypes.GET_ALL_USER_REQUEST });

    const response = await getAllUserApi();

    dispatch({
      type: userActionTypes.GET_ALL_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      dispatch({
        type: userActionTypes.GET_ALL_USER_FAIL,
        payload: error.response.data,
      });
      throw error;
    }
  }
};
