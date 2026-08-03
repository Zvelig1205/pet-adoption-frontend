import axios from "axios";

const request = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 5000
});

request.interceptors.request.use(config => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = token;
    }

    return config;
    
}, error => {
    console.log(error);
});

export default request;