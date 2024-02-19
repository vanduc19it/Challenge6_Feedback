import * as userActionTypes from "../actionTypes/userActionTypes";

interface UserAction {
  type: string;
  payload: {
    accessToken: string;
  };
}

const initialState = {
  loading: false,
  userInfo: {},
  error: null,
  users: [],
};

const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case userActionTypes.USER_LOGIN_REQUEST:
    case userActionTypes.USER_REGISTER_REQUEST:
      return { ...state, loading: true, error: null };

    case userActionTypes.USER_LOGIN_SUCCESS:
    case userActionTypes.USER_REGISTER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        error: null,
      };

    case userActionTypes.USER_LOGIN_FAIL:
    case userActionTypes.USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };

    case userActionTypes.USER_LOGOUT:
      return { ...state, userInfo: null, loading: false, error: null };

    case userActionTypes.USER_EDIT_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };

    case userActionTypes.USER_EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        error: null,
      };

    case userActionTypes.USER_EDIT_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case userActionTypes.REFRESH_TOKEN_REQUEST:
      return { ...state, loading: true, error: null };

    case userActionTypes.REFRESH_TOKEN_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          accessToken: action.payload.accessToken,
        },
        loading: false,
        error: null,
      };

    case userActionTypes.REFRESH_TOKEN_FAIL:
      return { ...state, loading: false, error: action.payload };

    case userActionTypes.GET_ALL_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case userActionTypes.GET_ALL_USER_SUCCESS:
      return { ...state, users: action.payload, loading: false, error: null };

    case userActionTypes.GET_ALL_USER_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default userReducer;
