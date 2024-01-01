// import axios from 'axios';

// export default axios.create({
//     baseURL: window.config.axiosBaseUrl,
//     // baseURL:'http://localhost:8080',
//     headers: {"ngrok-skip-browser-warning":"true"}
// });

import axios from 'axios';
import { useAuthContext } from "@asgardeo/auth-react";

// Custom hook to get access token
export function useGetToken() {
  const { getAccessToken } = useAuthContext();
  return async function getToken() {
    return await getAccessToken();
  };
}

const api = axios.create({
    baseURL: window.config.axiosBaseUrl,
    headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "Application/Json"
    }
});

api.interceptors.request.use(
    async config => {
        const getToken = useGetToken();
        const token = await getToken();
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;



