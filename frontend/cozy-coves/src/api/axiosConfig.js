// import axios from 'axios';
// const { getAccessToken } = useAuthContext();

// useEffect(() => {
//     getAccessToken().then((accessToken) => {
//         console.log("accessToken");
//         console.log(accessToken);
//     }).catch((error) => {
//         console.log(error);
//     });
// }, []);


// export default axios.create({
//     baseURL: "https://3f434093-3f6a-40a5-a34b-ca372af6c39e-dev.e1-eu-north-azure.choreoapis.dev/grvi/housemanagementservice/cozycoves-rest-endpoint-5c6/v1", 
//     // baseURL: window.config.axiosBaseUrl,
//     headers: {
//         "ngrok-skip-browser-warning":"true",
//         // "Access-Control-Allow-Origin": "*",
//         "Authorization": "Bearer" + accessToken,
//         "Content-Type":"Application/Json"
//     }
// });

import axios from 'axios';
import { useEffect } from 'react';

const useAuthContextAndCreateAxiosInstance = () => {
    const { getAccessToken } = useAuthContext();

    useEffect(() => {
        const createAxiosInstance = async () => {
            const axiosInstance = axios.create({
                baseURL: "https://3f434093-3f6a-40a5-a34b-ca372af6c39e-dev.e1-eu-north-azure.choreoapis.dev/grvi/housemanagementservice/cozycoves-rest-endpoint-5c6/v1",
                headers: {
                    "ngrok-skip-browser-warning": "true",
                    "Content-Type": "application/json"
                }
            });

            try {
                const accessToken = await getAccessToken();
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                console.log("accessToken:", accessToken);
            } catch (error) {
                console.log("Error fetching access token:", error);
                // Handle error if necessary
            }
        };

        createAxiosInstance();
    }, [getAccessToken]);

    // Optionally return axiosInstance or use it inside the useEffect
};

export default useAuthContextAndCreateAxiosInstance;


