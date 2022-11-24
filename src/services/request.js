import axios from "axios";
import { serverUrl } from "./baseUrl";

// const token = localStorage.getItem("token");

const http = axios.create({
  baseURL: serverUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const postRequest = async (uri, payload) => {
  return http.post(uri, payload);
};

export const getRequest = async (uri) => {
  return http.get(uri);
};

export const putRequest = async (uri, payload) => {
  return http.put(uri, payload);
};

export const deleteRequest = async (uri) => {
  return http.delete(uri);
};
