import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers/rootReducer";
import {
  getDataFromLocalStorage,
  localStorageMiddleware,
} from "../../utils/localStorage";

const initialUserInfo = getDataFromLocalStorage("userReducer") || {};
const initialChatInfo = getDataFromLocalStorage("chatReducer") || {};

const initialState = {
  userReducer: initialUserInfo,
  chatReducer: initialChatInfo,
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk, localStorageMiddleware))
);

export default store;
export type AppDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof rootReducer>;
