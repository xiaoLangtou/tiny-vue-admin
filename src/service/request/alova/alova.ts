/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2024-12-03 15:33:16
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-06 16:18:32
 * @FilePath: src/service/request/alova/alova.ts
 * @Description: 配置 alova.js 实例
 */

import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import VueHook from 'alova/vue';
import { ResultEnum } from '@/global/enums';
import { createClientTokenAuthentication } from 'alova/client';
import { handleServiceResult } from '@/service/request/config/handle';
import { useLoginStore } from '@/store';
import router from '@/router';
import { LOGIN_URL } from '@/global/constants';
import  {message} from 'ant-design-vue';

// 基础 alova 配置
const alovaOptions = {
    baseURL: import.meta.env.VITE_API_URL as string, // API 基础 URL
    timeout: ResultEnum.TIMEOUT as number, // 超时时间
    requestAdapter: adapterFetch(), // 请求适配器
    statesHook: VueHook, // 状态管理钩子
    cacheFor: null,
};

// 绑定 token 认证拦截器
const { onAuthRequired, onResponseRefreshToken } = createClientTokenAuthentication({
    async login(response) {
        try {
            const responseData = await response.clone().json();
            if (responseData.code === 0) {
                useLoginStore().setToken(responseData.data.accessToken);
            }
        } catch (e) {
            message.error((e as any).message);
            throw e;
        }
    },
    assignToken: (method) => {
        const loginStore = useLoginStore();
        method.config.headers['Authorization'] = `Bearer ${loginStore.token}`;
    },
});

// alova 实例
const alovaInstance = createAlova({
    ...alovaOptions,
    beforeRequest: onAuthRequired((method) => {
        method.config.cacheFor = 0;
    }),
    responded: onResponseRefreshToken({
        async onSuccess(response, method) {
            const responseClone = response.clone();
            // 判断是否是服务器断开导致的 500
            if (responseClone.status === 500) {
                const contentType = responseClone.headers.get('content-type') || '';

                if (!contentType.includes('application/json')) {
                    // ❌ 服务器崩溃或断开，跳转登录页
                    useLoginStore().setToken('');
                    message.error('服务器错误，请稍后重试');
                    await router.replace(LOGIN_URL);
                    // eslint-disable-next-line prefer-promise-reject-errors
                    return Promise.reject('服务器错误');
                }

                // ✅ 后端接口内部 500，解析 JSON 并提示错误
                try {
                    const responseData = await responseClone.json();
                    message.error(responseData.message || '请求错误');
                    return Promise.reject(responseData.message || '接口错误');
                } catch (err) {
                    message.error('解析错误');
                    // eslint-disable-next-line prefer-promise-reject-errors
                    return Promise.reject('解析错误');
                }
            }

            try {
                const responseData = await (method.meta?.isBlob ? responseClone.blob() : responseClone.json());

                // 成功处理
                if (responseClone.status === ResultEnum.SUCCESS && responseData.code === 0) {
                    return handleServiceResult(responseData);
                }

                // 其他错误处理
                const errorMessage = responseData.message || response.statusText;

                // Token 过期处理
                if (responseClone.status === ResultEnum.OVERDUE) {
                    useLoginStore().setToken('');
                    await router.replace(LOGIN_URL);
                }

                message.error(errorMessage);
                return Promise.reject(errorMessage);
            } catch (err: any) {
                // 解析错误处理
                const errMsg = err.message || (typeof err === 'object' ? JSON.stringify(err) : err);
                message.error(errMsg);
                throw err;
            }
        },
        onError(error) {
            message.error(`请求失败: ${error.message}`);
        },
    }),
});

export { alovaInstance };
