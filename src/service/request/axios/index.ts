/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-18 14:39:19
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-18 16:57:57
 * @FilePath: src/service/request/axios/index.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import type { IRequestConfig } from '../../interface/type.ts';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

class Request {
    public instance: AxiosInstance;

    public constructor(config: IRequestConfig) {
        this.instance = axios.create(config);

        // 每个instance实例都添加拦截器
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig<any>) => {
                NProgress.start();
                return config;
            },
            (err) => {
                NProgress.done();
                return err;
            },
        );
        this.instance.interceptors.response.use(
            (res) => {
                NProgress.done();
                return res.data;
            },
            (err) => {
                NProgress.done();
                return err;
            },
        );

        // 针对特定的hyRequest实例添加拦截器
        if (config.interceptors?.requestSuccessFn) {
            this.instance.interceptors.request.use(
                config.interceptors.requestSuccessFn as (
                    config: InternalAxiosRequestConfig<any>,
                ) => InternalAxiosRequestConfig<any>,
            );
        }
        if (config.interceptors?.requestFailureFn) {
            this.instance.interceptors.request.use(null, config.interceptors.requestFailureFn as (error: any) => any);
        }
        if (config.interceptors?.responseSuccessFn) {
            this.instance.interceptors.response.use(config.interceptors.responseSuccessFn as (response: any) => any);
        }
        if (config.interceptors?.responseFailureFn) {
            this.instance.interceptors.response.use(null, config.interceptors.responseFailureFn as (error: any) => any);
        }
    }

    // 封装网络请求的方法
    // T => IHomeData
    public request<T = any>(config: IRequestConfig<T>) {
        // 单次请求的成功拦截处理
        let _config = { ...config };
        if (_config.interceptors?.requestSuccessFn) {
            _config = _config.interceptors.requestSuccessFn(_config as InternalAxiosRequestConfig<any>);
        }

        return new Promise<T>((resolve, reject) => {
            this.instance
                .request<any, T>(_config)
                .then((res) => {
                    let modifiedRes = res;
                    if (config.interceptors?.responseSuccessFn) {
                        modifiedRes = config.interceptors.responseSuccessFn(res);
                    }
                    resolve(modifiedRes);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public get<T = any>(config: IRequestConfig<T>) {
        return this.request({ ...config, method: 'GET' });
    }

    public post<T = any>(config: IRequestConfig<T>) {
        return this.request({ ...config, method: 'POST' });
    }

    public delete<T = any>(config: IRequestConfig<T>) {
        return this.request({ ...config, method: 'DELETE' });
    }

    public patch<T = any>(config: IRequestConfig<T>) {
        return this.request({ ...config, method: 'PATCH' });
    }
}

export default Request;
