import axios from 'axios';

export default axios.create({
    baseURL: "https://3f434093-3f6a-40a5-a34b-ca372af6c39e-dev.e1-eu-north-azure.choreoapis.dev/grvi/housemanagementservice/cozycoves-rest-endpoint-5c6/v1.0", 
    // Have to change locally   
    headers: {
        "ngrok-skip-browser-warning":"true",
        // "Access-Control-Allow-Origin": "*",
    }
});
