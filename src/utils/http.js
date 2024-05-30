// 在 /src/utils/http.js
import axios from 'axios';
import router from "@/router";
import ElementUI from "element-ui";
import {contextPath} from "@/config";

const http = axios.create({
    baseURL: contextPath.APP_CONTEXT,
    headers: {'Content-Type': 'application/json'}
});

http.interceptors.request.use(
    config => {
        if (localStorage.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = localStorage.getItem("token");
        } else {//退出到登录页面，或者发起微信授权，根据业务决定
            router.push('/login');
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

http.interceptors.response.use(response => {
        return response;
    },
    error => {
        if (error.response.status === 403) {
            router.push({
                path: '/login'
            });
        }
        if (error.response.status >= 500) {
            ElementUI.Message.error("服务器错误")
        }
        return Promise.resolve(error.response);
    });


export default http;