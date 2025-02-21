/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-17 21:36:47
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-17 21:46:31
 * @FilePath: src/router/index.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import staticRoute from './static-route.ts';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [...staticRoute];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
