import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";

Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'small'
});
Vue.prototype.$axios = axios;

axios.defaults.baseURL = 'http://localhost:8098';

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = "发布辅助器"
    const name = localStorage.getItem('ms_username');
    const role = localStorage.getItem('role');
    if (!name && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        (role === 'admin' || role === 'super_admin') ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
})


axios.interceptors.request.use(
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

axios.interceptors.response.use(response => {
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


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')