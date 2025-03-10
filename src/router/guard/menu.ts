/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 16:28:30
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-25 15:29:43
 * @FilePath: src/router/guard/menu.ts
 * @Description: 菜单路由守卫
 */

import type { Router, RouteRecordRaw } from 'vue-router';
// @ts-ignore
import NProgress from 'nprogress';
import { useMenuStore } from '@/store/module';
import { MenuOptions } from '@/service/interface/menu';

// 导入当前项目中views下的所有路由文件
const views = import.meta.glob('../../views/**/*.vue');

const toRoutes = (menus: MenuOptions[]) => {
    const router: RouteRecordRaw[] = [];
    menus.forEach((menu) => {
        console.log(menu);
        const path = menu.component
            ? `../../views${menu.component}${menu.component.includes('.vue') ? '' : '.vue'}`
            : '';
        router.push({
            name: menu.name,
            path: menu.path,
            component: views[path] ?? '',
            children: [...toRoutes(menu.children ?? [])],
            meta: {
                ...menu.meta,
                id: menu.id,
                parentId: menu.parentId,
            },
        });
    });

    return router;
};

export const setupMenuGuard = (router: Router) => {
    let has404 = false;
    router.beforeEach(async (to, from, next) => {
        NProgress.start();
        if (to.name === 'Login') {
            next();
            NProgress.done();
            return;
        }
        if (!has404) {
            has404 = true;
            router.addRoute({
                path: '/:pathMatch(.*)*',
                component: () => import('@/views/error-page/not-found.vue'),
            });
        }
        await nextTick();
        const menuStore = useMenuStore();
        if (menuStore.menuList.length) {
            console.log(router.getRoutes());
            next();
            return;
        }
        const data = await menuStore.getAuthMenuList();
        if (!data || data.length <= 0) {
            next({ name: '403' });
            return;
        }
        const routes = toRoutes(data);
        routes.forEach((route) => {
            if (!router.hasRoute(route.name)) {
                router.addRoute('root', route);
            }
        });

        next({ ...to, replace: true });
    });
};
