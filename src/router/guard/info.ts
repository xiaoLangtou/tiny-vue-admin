/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 16:13:20
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-12 17:45:54
 * @FilePath: src/router/guard/info.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { getUserInfo } from '@/service/apis/login';
import { useLoginStore } from '@/store/module';
import NProgress from 'nprogress';
import type { LocationQueryRaw, Router } from 'vue-router';

export default function setupInfoGuard(router: Router) {
    router.beforeEach(async (to, from, next) => {
        NProgress.start();
        if (to.name === 'Login') {
            next();
            NProgress.done();
            return;
        }
        const loginStore = useLoginStore();
        const { data } = (await getUserInfo()) ?? { data: null };
        if (!data) {
            next({ name: 'Login', query: { redirect: to.name, ...to.query } as unknown as LocationQueryRaw });
            loginStore.setToken('');
            NProgress.done();
            return;
        }

        loginStore.setUserInfo({ userInfo: data.userInfo });
        next();
        NProgress.done();
    });
}
