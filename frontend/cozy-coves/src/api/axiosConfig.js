// import axios from 'axios';

// export default axios.create({
//     baseURL: window.config.axiosBaseUrl,
//     // baseURL:'http://localhost:8080',
//     headers: {"ngrok-skip-browser-warning":"true"}
// });

import axios from 'axios';
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect } from 'react';

const App = () => {
    const { getAccessToken } = useAuthContext();
    let axiosInstance;

    useEffect(() => {
        getAccessToken().then((accessToken) => {
            axiosInstance = axios.create({
                baseURL: window.config.axiosBaseUrl,
                headers: {
                    "ngrok-skip-browser-warning": "true",
                    "Authorization": "Bearer " + accessToken,
                    "Content-Type": "Application/Json"
                }
            });
        }).catch((error) => {
            console.log(error);
        });
    }, []);
}
