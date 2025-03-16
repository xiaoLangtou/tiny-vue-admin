import xltRequest from '@/service/request/alova';
import type { ILogs, ILogsParams, TLogsListResult } from '../interface/logs';

/**
 * @description 获取列表
 */
export const getLogsList = (params?: ILogsParams) => {
    return xltRequest.Get<TLogsListResult>('/logger/list', { params: { ...params } });
};

/**
 * @description 获取详情
 * @param {number} id id
 */
export const getLogsDetail = (id: number) => {
    return xltRequest.Get<ILogs>(`/logger/detail?id=${id}`);
};
