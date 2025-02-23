/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 14:51:59
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-23 14:37:55
 * @FilePath: src/router/guard/index.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import type { Router } from 'vue-router';
import setupPermissionGuard from './permission';
import setupInfoGuard from '@/router/guard/info';
import { setupMenuGuard } from '@/router/guard/menu';

export default function setupPageGuard(router: Router) {
    setupPermissionGuard(router);
    setupInfoGuard(router);
    setupMenuGuard(router);
}
