import { jwtDecode } from "jwt-decode";
import { homeapi, refreshtokenapi } from "./api";
import axios from "axios";
import { store } from "./store";
import { userset } from "./User";
const api = axios.create({
  baseURL: homeapi,
  withCredentials: true, // 🔹 important → cookies include cheyyan
});
// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const access = state.usercounter?.access;   // 🔹 FIXED

    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(refreshtokenapi,{},{withCredentials:true}); // api instance use cheyyuka
        const accesstok = res.data.accesstoken;

        const decode = jwtDecode(accesstok);
        store.dispatch(
          userset({
            access: accesstok,
            username: decode.username,
            id: decode.user_id,
            role: decode.role,
          })
        );

        // 🔹 New access token header-ിൽ add cheyyuka
        originalRequest.headers.Authorization = `Bearer ${accesstok}`;

        return api(originalRequest);
      } catch (err) {
        console.log("Refresh token expired. Please login again.");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
export default api;