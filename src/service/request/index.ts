import { StorageUtil } from '@/utils/storage.ts';
import baseConfig from './config';
import Request from './axios';

const request = new Request({
    baseURL: baseConfig.baseURL,
    timeout: baseConfig.timeout,
    interceptors: {
        requestSuccessFn: (config) => {
            // 每一个请求都自动携带token
            const token = StorageUtil.get(baseConfig.tokenName);
            if (config.headers && token) {
                // 类型缩小
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        },
    },
});

export default request;
