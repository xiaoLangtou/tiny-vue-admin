import type { ReqPage, ResPage } from '@/service/interface/type.ts';
import type { ServiceResult } from '@/service/request/config/handle.ts';

export interface ILogs {
    id?: number;
    logType?: string;
    logContent?: string;
    // 请求参数
    requestParam?: string;
    // 请求地址
    requestUrl?: string;
    // 请求方法
    requestMethod?: string;
    // 请求IP
    requestIp?: string;
    // 请求ip地址
    requestIpAddr?: string;
    // 请求耗时
    requestTimeConsume?: string;
    //浏览器类型
    browser?: string;
    // 操作系统
    os?: string;
    // 所属模块
    module?: string;
    // 响应头
    responseHeader?: string;
    // 响应体
    responseBody?: string;
    // 请求头
    requestHeader?: string;
    // 请求体
    requestBody?: string;
    status: number;

    [prototype: string]: any;
}

export interface ILogsParams extends ReqPage {
    startTime?: string;
    endTime?: string;
    createBy?: string;

    [prototype: string]: any;
}

export type TLogsListResult = ServiceResult<ResPage<ILogs>>;
export type TLogsDetailResult = ServiceResult<ILogs>;
