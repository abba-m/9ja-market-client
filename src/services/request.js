import axios from "axios";
import { serverUrl } from "./baseUrl";

const getToken = () => localStorage.getItem("token");

const getRequestConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  }
});

const http = axios.create({
  baseURL: serverUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


export const postRequest = async (uri, payload) => {
  return http.post(uri, payload, getRequestConfig());
};

export const getRequest = async (uri) => {
  return http.get(uri, getRequestConfig());
};

export const putRequest = async (uri, payload) => {
  return http.put(uri, payload, getRequestConfig());
};

export const deleteRequest = async (uri) => {
  return http.delete(uri, getRequestConfig());
};
