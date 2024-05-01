import axios, { AxiosResponse } from "axios";

const baseURL =   "http://localhost:4000/api";

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("access_token");

    if (token) {
      console.log("token", token);
      config.headers.Authorization = `Bearer ${token}`;
    }
    // You can add headers, authentication tokens, etc. here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios response interceptor
instance.interceptors.response.use(
  (response) => {
    // You can handle response data, status codes, etc. here
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const Post = (url, payload) => instance.post(url, payload);

export const Patch = (url, payload) =>
  instance.patch(url, payload);

export const Delete = (url) => instance.delete(url);

export const Get = (url) => instance.get(url);

export const PostwithBuffer = (url, payload) =>
  instance.post(url, payload, {
    responseType: "arraybuffer",
    headers: { "Content-Type": "application/json" },
  });

export default instance;
