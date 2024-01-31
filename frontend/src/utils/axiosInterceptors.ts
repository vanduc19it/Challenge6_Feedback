import axios from "axios";
import store from "../redux/store";
import { refreshAccessToken } from "../redux/actions/userActions";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;
const api = axios.create({
  baseURL: `${URL_SERVER}/auth/`,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      try {
        await store.dispatch(refreshAccessToken());
        return api.request(error.config);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
