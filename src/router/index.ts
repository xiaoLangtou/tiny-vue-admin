/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-17 21:36:47
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-22 14:54:21
 * @FilePath: src/router/index.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import staticRoute from './static-route';
import type { RouteRecordRaw } from 'vue-router';
import setupPageGuard from '@/router/guard';

const routes: RouteRecordRaw[] = [...staticRoute];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

setupPageGuard(router);

export default router;
