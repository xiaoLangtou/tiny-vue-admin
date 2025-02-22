/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-18 13:55:17
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-22 14:36:15
 * @FilePath: src/store/index.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { createPinia } from 'pinia';
import { useAppStore, useLoginStore } from '@/store/module';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import { GLOBAl_STORAGE_PREFIX } from '@/global/constants';

const store = createPinia();
store.use(
    createPersistedState({
        key: (id) => `${GLOBAl_STORAGE_PREFIX}_pinia_${id}`,
        storage: localStorage,
    }),
);
export { useAppStore, useLoginStore };

export default store;
