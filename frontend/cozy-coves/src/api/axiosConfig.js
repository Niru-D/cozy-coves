// import axios from 'axios';

// export default axios.create({
//     baseURL: window.config.axiosBaseUrl,
//     // baseURL:'http://localhost:8080',
//     headers: {"ngrok-skip-browser-warning":"true"}
// });

import axios from 'axios';
import { useAuthContext } from "@asgardeo/auth-react";

const api = axios.create({
    baseURL: window.config.axiosBaseUrl,
    headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "Application/Json"
    }
});

api.interceptors.request.use(
    async config => {
        const { getAccessToken } = useAuthContext();
        const token = await getAccessToken();
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;


