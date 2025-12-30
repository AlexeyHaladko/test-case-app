import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { AUTH_TOKEN_KEY, getAuthToken } from "@/api/utils.ts";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json, text/plain, */*",
  },
});

client.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(response => {
  return response;
}, error => {
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    throw error.response.data.error || "Smth With Wrong";
  } else if (axios.isAxiosError(error)) {
    throw error?.response?.data?.error || "Smth With Wrong";
  } else {
    throw {message: "Smth Went Wrong "};
  }
});

export const get = async <T>(url: string, config?: AxiosRequestConfig<T>) => {
  const response = await client.get<T>(url, config);
  return response.data;
};

export const deleteReq = async <T>(url: string, config?: AxiosRequestConfig<T>) => {
  const response = await client.delete<T>(url, config);
  return response.data;
}

export const post = async <T, R>(url: string, config: T) => {
  const response = await client.post<T, AxiosResponse<R>>(url, config);
  return response.data;
}

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return client({ ...config, ...options });
};