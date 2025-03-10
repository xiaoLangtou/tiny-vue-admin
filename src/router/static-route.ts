/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-17 21:44:48
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-23 15:27:49
 * @FilePath: src/router/static-route.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

const staticRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/main',
    },
    {
        name: 'root',
        path: '/main',
        component: Layout,
        children: [],
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/403',
        name: '403',
        component: () => import('@/views/error-page/forbidden.vue'),
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/not-found.vue'),
    },
    {
        path: '/503',
        name: '503',
        component: () => import('@/views/error-page/service-unavailable.vue'),
    },
];

export default staticRoutes;
