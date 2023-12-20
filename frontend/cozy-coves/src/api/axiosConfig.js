import axios from 'axios';

export default axios.create({
    baseURL: window.config.axiosBaseUrl,
    headers: {
        "ngrok-skip-browser-warning":"true",
        "Access-Control-Allow-Origin": "*",
    }
});
