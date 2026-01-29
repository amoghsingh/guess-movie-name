import axios, { AxiosError } from "axios";
import { useAuthContext } from "../context/context";
import { useNavigate } from "react-router-dom";

export const Api = () => {
  const { accessToken, setAccessToken } = useAuthContext();
  const navigate = useNavigate();

  const api = axios.create({ baseURL: "http://localhost:5000/api/auth/", headers: { "Content-Type": "application/json", } });
  
  api.interceptors.request.use(
    (config) => {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      const originalRequest = error.config;
      if (
        error.status === 401 &&
        !originalRequest._retry &&
        originalRequest.url !== "/refresh"
      ) {
        originalRequest._retry = true;
        try {
          const res = await api.get("/refresh");
          console.log("after getting new access token : ", res);
          const atoken = res.data.token;
          setAccessToken(atoken);
          originalRequest.headers.Authorization = `Bearer ${atoken}`;
          return api(originalRequest); // retrying the request again with updated access token
        } catch (refreshError: unknown) {
          if (refreshError instanceof AxiosError && refreshError.status === 401) {
            setAccessToken("");
            navigate("/login");
          }
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );
  return api;
};
