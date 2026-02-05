import { useEffect } from "react";
import { Api } from "./Api";
import { useAuthContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { AxiosError } from 'axios';

export const ApiInterceptorProvider = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, setAccessToken } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = Api.interceptors.request.use((config) => {
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    const resInterceptor = Api.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;
              if (
                error.status === 401 &&
                !originalRequest._retry &&
                originalRequest.url !== "/refresh"
              ) {
                originalRequest._retry = true;
                try {
                  const res = await Api.get("/refresh");
                  console.log("after getting new access token : ", res);
                  const atoken = res.data.token;
                  setAccessToken(atoken);
                  originalRequest.headers.Authorization = `Bearer ${atoken}`;
                  return Api(originalRequest); // retrying the request again with updated access token
                } catch (refreshError: unknown) {
                  if (refreshError instanceof AxiosError && refreshError.status === 401) {
                    setAccessToken("");
                    navigate("/login");
                  }
                  return Promise.reject(refreshError);
                }
              }
        
              return Promise.reject(error);
      }
    );

    //Inside the useEffect, we are registering Axios interceptors: request and response. Each call to .use() adds a new interceptor to Axios and returns an ID(a number) reqInterceptor and resInterceptor. Axios will run all the registered interceptors for every request/response. Below function eject removes (unregisters) the interceptor that was previously added. Without eject, every token would add more interceptors. Request would get multiple Authorization headers , duplicated redirects, hard to debug behaviour.
    return () => {
      Api.interceptors.request.eject(reqInterceptor);
      Api.interceptors.response.eject(resInterceptor);
    };
  }, [accessToken, navigate, setAccessToken]);

  return <>{children}</>;
};
