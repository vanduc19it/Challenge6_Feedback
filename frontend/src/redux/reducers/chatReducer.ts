import * as chatActionTypes from "../actionTypes/chatActionTypes";

interface ChatAction {
  type: string;
  payload: unknown;
}

const initialState = {
  loading: false,
  channels: [],
  selectedChannel: null,
  messageChannel: [],
  error: null,
};

const chatReducer = (state = initialState, action: ChatAction) => {
  switch (action.type) {
    case chatActionTypes.CREATE_CHANNEL_REQUEST:
      return { ...state, loading: true, error: null };

    case chatActionTypes.CREATE_CHANNEL_SUCCESS:
      return {
        ...state,
        channels: [action.payload, ...state.channels],
        loading: false,
        error: null,
      };

    case chatActionTypes.CREATE_CHANNEL_FAIL:
      return { ...state, loading: false, error: action.payload };

    case chatActionTypes.GET_ALL_CHANNELS_REQUEST:
      return { ...state, loading: true, error: null };

    case chatActionTypes.GET_ALL_CHANNELS_SUCCESS:
      return {
        ...state,
        channels: action.payload,
        loading: false,
        error: null,
      };

    case chatActionTypes.GET_ALL_CHANNELS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case chatActionTypes.GET_SELECTED_CHANNEL_REQUEST:
      return { ...state, loading: true, error: null };

    case chatActionTypes.GET_SELECTED_CHANNEL_SUCCESS:
      return {
        ...state,
        selectedChannel: action.payload,
        loading: false,
        error: null,
      };

    case chatActionTypes.GET_SELECTED_CHANNEL_FAIL:
      return { ...state, loading: false, error: action.payload };

    case chatActionTypes.JOIN_CHANNEL_REQUEST:
      return { ...state, loading: true, error: null };

    case chatActionTypes.JOIN_CHANNEL_SUCCESS:
      return { ...state, loading: false, error: null };

    case chatActionTypes.JOIN_CHANNEL_FAIL:
      return { ...state, loading: false, error: action.payload };

    case chatActionTypes.GET_MESSAGES_REQUEST:
      return { ...state, loading: true, error: null };

    case chatActionTypes.GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messageChannel: action.payload,
        loading: false,
        error: null,
      };

    case chatActionTypes.GET_MESSAGES_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default chatReducer;
