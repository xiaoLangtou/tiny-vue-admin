/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-27 20:03:35
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-08 15:03:09
 * @FilePath: src/composables/common/useAntdToken.ts
 * @Description: 在项目中使用antd的token
 */
import { theme } from 'ant-design-vue';

export const useAntdToken = createSharedComposable(() => {
    const { token: antdToken } = theme.useToken();
    const token = computed(() => antdToken.value); // 让 token 依赖 antdToken
    return {
        token,
    };
});
