/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 14:54:39
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-23 17:15:00
 * @FilePath: src/router/guard/permission.ts
 * @Description: 登录状态校验
 */
import type { LocationQueryRaw, Router } from 'vue-router';
import NProgress from 'nprogress';

import { useLoginStore } from '@/store';
import { Modal } from '@opentiny/vue';
import { useMessage } from '@/hooks/useMessage';

export default function setupPermissionGuard(router: Router) {
    router.beforeEach(async (to, from, next) => {
        const loginStore = useLoginStore();
        NProgress.start();
        if (!loginStore.isLogin) {
            if (to.name === 'Login') {
                next();
                NProgress.done();
                return;
            }
            await nextTick();
            useMessage().error('请先登录');
            await nextTick();
            next({
                name: 'Login',
                query: {
                    redirect: to.name,
                    ...to.query,
                } as unknown as LocationQueryRaw,
            });
            NProgress.done();
        } else {
            next();
            NProgress.done();
        }
    });
}
