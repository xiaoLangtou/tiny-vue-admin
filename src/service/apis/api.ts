/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-09 10:36:38
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-09 10:44:59
 * @FilePath: src/service/apis/api.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import xltRequest from '@/service/request/alova';
import { TApiListResult, TApiDetailResult, IApi, TApiGroupResult, IApiParams, TApiSyncResult } from '../interface/api';

/**
 * @description 获取列表
 */
export const getApiList = (params?: IApiParams) => {
    return xltRequest.Get<TApiListResult>('/api/list', { params: { ...params } });
};

/**
 * @description 获取详情
 * @param {number} id id
 */
export const getApiDetail = (id: number) => {
    return xltRequest.Get<TApiDetailResult>(`/api/detail/${id}`);
};

/**
 * @description 新增
 * @method post
 * @returns
 */
export const addApi = (data: IApi) => {
    return xltRequest.Post('/api/add', data);
};

/**
 * @description 编辑
 * @method post
 * @returns
 */
export const editApi = (data: IApi) => {
    return xltRequest.Post('/api/edit', data);
};

/**
 * @description 删除
 * @param {number} id 用户id
 * @method delete
 * @returns
 */
export const deleteApi = (id: number) => {
    return xltRequest.Delete(`/api/remove/${id}`);
};

/**
 * @description 获取分组列表
 */
export const getApiGroup = () => {
    return xltRequest.Get<TApiGroupResult>('/api/group');
};

/**
 * 同步api列表
 */
export const syncApi = () => {
    return xltRequest.Get<TApiSyncResult>('/api/synchronous');
};

/**
 *更新缓存
 */
export const updateApiCache = () => {
    return xltRequest.Get('/api/freshCasbin');
};

/**
 * 忽略接口
 */
export const ignoreApi = (data: IApi) => {
    return xltRequest.Post('/api/ignore', data);
};

/**
 * 批量创建接口
 */
export const batchCreateApi = (data: IApi[]) => {
    return xltRequest.Post('/api/batch-apis', data);
};

export const getAllApis = () => {
    return xltRequest.Get<TApiListResult>(`/api/all`);
};
