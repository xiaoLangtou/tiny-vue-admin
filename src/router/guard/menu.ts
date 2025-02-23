/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 16:28:30
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-22 16:32:02
 * @FilePath: src/router/guard/menu.ts
 * @Description: 菜单路由守卫
 */

import type { LocationQueryRaw, Router } from 'vue-router';
import NProgress from 'nprogress';
import { useLoginStore } from '@/store';
import { getUserMenu } from '@/service/module/login';

export default function setupMenuGuard(router: Router) {
    router.beforeEach(async (to, from, next) => {
        NProgress.start();
        if (to.name === 'Login') {
            next();
            NProgress.done();
            return;
        }
        const loginStore = useLoginStore();
        const { data } = (await getUserMenu()) ?? { data: null };
        if (!data) {
            next({ name: 'Login', query: { redirect: to.name, ...to.query } as unknown as LocationQueryRaw });
        }

        loginStore.setAuthMenuList({
            authMenuList: data,
        });
        next();
    });
}
