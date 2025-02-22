/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2024-12-03 15:33:16
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-22 14:05:57
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
import { Modal } from '@opentiny/vue';

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
            Modal.message({ message: (e as any).message, status: 'error' });
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
            try {
                const responseData = await (method.meta?.isBlob ? responseClone.blob() : responseClone.json());

                // 成功处理
                if (responseClone.status === ResultEnum.SUCCESS && responseData.code === 0) {
                    return handleServiceResult(responseData);
                }

                // 处理非成功状态
                const message = responseData.message || response.statusText;

                // token 过期处理
                if (responseClone.status === ResultEnum.OVERDUE) {
                    console.warn('Token expired, redirecting to login...');
                    useLoginStore().setToken('');
                    await router.replace(LOGIN_URL);
                }

                await Promise.reject(message);
                return handleServiceResult(responseData, false);
            } catch (err: any) {
                Modal.message({
                    message: err.message ? err.message : typeof err === 'object' ? JSON.stringify(err) : err,
                    status: 'error',
                });
                throw err;
            }
        },
        onError(error) {
            Modal.message({ message: `Request failed: ${error.message}`, status: 'error' });
        },
    }),
});

export { alovaInstance };
