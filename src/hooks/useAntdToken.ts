/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-27 20:03:35
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-27 20:07:32
 * @FilePath: src/hooks/useAntdToken.ts
 * @Description: 在项目中使用antd的token
 */
import { theme } from 'ant-design-vue';
import type { GlobalToken } from 'ant-design-vue/es/theme';

export const useAntdToken = createSharedComposable(() => {
    const { token: antdToken } = theme.useToken();
    const token = ref<GlobalToken>(antdToken.value);

    const setToken = (globalToken: GlobalToken) => {
        token.value = globalToken;
    };

    return {
        token,
        setToken,
    };
});
