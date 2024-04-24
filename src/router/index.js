import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '主页' }
                },
                {
                    path: '/settings_manager',
                    component: resolve => require(['../components/page/SettingsManager.vue'], resolve),
                    meta: { title: '配置' }
                },
                {
                    path: '/movie_release',
                    component: resolve => require(['../components/page/MovieRelease.vue'], resolve),
                    meta: { title: '电影' }
                },
                {
                    path: '/tv_release',
                    component: resolve => require(['../components/page/TvRelease.vue'], resolve),
                    meta: { title: '电视剧' }
                },
                {
                    path: '/short_tv_release',
                    component: resolve => require(['../components/page/ShortTvRelease.vue'], resolve),
                    meta: { title: '短剧' }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        },
    ]
})
