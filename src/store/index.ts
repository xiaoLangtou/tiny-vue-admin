/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-18 13:55:17
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-20 20:26:35
 * @FilePath: src/store/index.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { createPinia } from 'pinia';
import { useLoginStore, useAppStore } from '@/store/module';

const store = createPinia();

export { useAppStore, useLoginStore };

export default store;
