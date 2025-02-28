/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 14:51:59
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-27 17:43:22
 * @FilePath: src/router/guard/index.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import type { Router } from 'vue-router';
import NProgress from 'nprogress';
import setupPermissionGuard from './permission';
import setupInfoGuard from '@/router/guard/info';
import { setupMenuGuard } from '@/router/guard/menu';

NProgress.configure({
    showSpinner: false,
    speed: 500,
});

const removeLoading = () => {
    const element = document.getElementById('gva-loading-box');
    if (element) {
        element.remove();
    }
};

export default function setupPageGuard(router: Router) {
    setupPermissionGuard(router);
    setupInfoGuard(router);
    setupMenuGuard(router);
    removeLoading();
    NProgress.done();
}
