import axios from "axios";
import { StorageService } from "./services/storage.service";
import { AllAppConfig } from "../config/all-config";

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_END_POINT; // process.env.REACT_APP_API_END_POINT;

const setupAxiosInterceptors = (onUnauthenticated: () => void) => {
  const onRequestSuccess = (config: any) => {
    // config.headers.localTest = 'ar';

    const token =
      StorageService.local.get(AllAppConfig.NAME_TOKEN_CURRENT_USER) ||
      StorageService.session.get(AllAppConfig.NAME_TOKEN_CURRENT_USER);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  };
  const onRequestError = (error: any) => {
    console.log("error ", error);
  };

  const onResponseSuccess = (response: any) => {
    return response;
  };
  const onResponseError = (err: any) => {
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess, onRequestError);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
