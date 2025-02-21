/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-18 14:40:44
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-18 14:44:16
 * @FilePath: src/service/interface/type.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

// 针对AxiosRequestConfig配置进行扩展
export interface IInterceptors<T = AxiosResponse> {
    requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    requestFailureFn?: (err: any) => any;
    responseSuccessFn?: (res: T) => T;
    responseFailureFn?: (err: any) => any;
}

export interface IRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?: IInterceptors<T>;
}
