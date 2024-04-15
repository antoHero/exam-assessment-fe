/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from 'axios';
import type { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
    headers: AxiosRequestHeaders
}

const config = {
    baseURL: 'http://127.0.0.1/api/v1/',
    timeout: 50000,
    headers: {
      Authorization: localStorage.getItem("token") ? "Bearer " + localStorage.getItem("token") : null,
    },
};

const axios = Axios.create(config);

// Interceptors
axios.interceptors.request.use(
    (config): AdaptAxiosRequestConfig => {
        if(localStorage.getItem("token") != undefined){
            config.headers["Authorization"] = "Bearer " + localStorage.getItem("token")
        }
        return config;
    },
    (error): any => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    async (response): Promise<any> => {
      return response;
    },
    async (error): Promise<any> => {
      return Promise.reject(error);
    }
);

export default axios;