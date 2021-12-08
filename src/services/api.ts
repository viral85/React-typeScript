/* eslint-disable func-names */
import axios from "axios";
import { API_BASE_URL } from "../utils/appConfig";

// Set config defaults when creating the instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Alter defaults after instance has been created
// axiosInstance.defaults.headers.common.Authorization = "";

// Add a request interceptor
axiosInstance.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  return request;
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if (
      !(
        response &&
        response.data && 
        response.data.data
      )
    ) {
      if(response.data.code !== 200){
          alert(response.data.message);
          return null;
      } else 
      {
        return response.data;
      }
    }
    return response.data;
  },
  (error) => {
    alert('Something Went Wrong');
    return Promise.reject(error);
  }
);

export default axiosInstance;
