/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-18 13:55:17
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-12 17:42:44
 * @FilePath: src/store/index.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { GLOBAl_STORAGE_PREFIX } from '@/global/constants';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

const store = createPinia();
store.use(
    createPersistedState({
        key: (id) => `${GLOBAl_STORAGE_PREFIX}_pinia_${id}`,
        storage: localStorage,
    }),
);

export default store;
