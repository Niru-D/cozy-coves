import axios from 'axios';

export default axios.create({
    baseURL: window.config.choreoApiUrl,  
    // Have to change locally   
    headers: {
        "ngrok-skip-browser-warning":"true",
        // "Access-Control-Allow-Origin": "*",
    }
});
