/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 16:28:30
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-13 10:53:56
 * @FilePath: src/router/guard/menu.ts
 * @Description: 菜单路由守卫
 */

import type { MenuOptions } from '@/service/interface/menu';
import { useMenuStore } from '@/store/module';
import NProgress from 'nprogress';
import type { RouteLocationNormalized, Router, RouteRecordRaw } from 'vue-router';

// 导入当前项目中views下的所有路由文件
interface VueModule {
    default: any;
    [key: string]: any;
}

const context = import.meta.webpackContext('/src/views/', {
    recursive: true,
    regExp: /\.vue$/,
    mode: 'lazy',
    chunkName: 'views/[request]',
    prefetch: true,
});

const views: Record<string, any> = {};
for (const path of context.keys()) {
    const modulePath = path.replace('./', '/src/views/');
    views[modulePath] = () => (context(path) as Promise<VueModule>).then((module) => module?.default || module);
}
const toRoutes = (menus: MenuOptions[]) => {
    const routes: RouteRecordRaw[] = [];
    menus.forEach((menu) => {
        const path = menu.component
            ? `/src/views${menu.component}${menu.component.includes('.vue') ? '' : '.vue'}`
            : '';
        routes.push({
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

    return routes;
};

const setDocumentTitle = (router: Router, to: RouteLocationNormalized) => {
    const route = router.getRoutes().find((item) => item.path === to.path);
    const appTitle = import.meta.env.VITE_GLOB_APP_TITLE;
    useTitle(`${route?.meta?.title} - ${appTitle}`);
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
            next();
            NProgress.done();
            return;
        }
        const data = await menuStore.getAuthMenuList();
        if (!data || data.length <= 0) {
            next({ name: '403' });
            NProgress.done();
            return;
        }
        const routes = toRoutes(data);
        routes.forEach((route: RouteRecordRaw) => {
            if (route.name && !router.hasRoute(route.name)) {
                console.log('addRoute', route);
                router.addRoute('root', route);
            }
        });
        setDocumentTitle(router, to);
        next({ ...to, replace: true });
        NProgress.done();
    });
};
