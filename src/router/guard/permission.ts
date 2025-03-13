/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 14:54:39
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-12 17:45:53
 * @FilePath: src/router/guard/permission.ts
 * @Description: 登录状态校验
 */
import { useLoginStore } from '@/store/module';
import { message } from 'ant-design-vue';
import NProgress from 'nprogress';
import type { LocationQueryRaw, Router } from 'vue-router';

const [messageApi] = message.useMessage();

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
            messageApi.error('请先登录');
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
