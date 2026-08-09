import axios from "axios";
import { ElMessage } from "element-plus";
import router from "../router";

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
    return Promise.reject(error);
});

request.interceptors.response.use(resp => {

    if (resp.data.code !== 200) {
        ElMessage.error(resp.data.message);
        return Promise.reject(resp.data);
    }

    return resp;

}, error => {

    if (error.response) {
        
        const status = error.response.status;
                
        if (status === 401) {
            ElMessage.error("请先登录");
            localStorage.removeItem("token");
            
            router.push("/login");
        } else {
            ElMessage.error(error.response.data.message || "请求失败");
        }

    } else {
        ElMessage.error("网络错误");
    }

    return Promise.reject(error);
});


export default request;