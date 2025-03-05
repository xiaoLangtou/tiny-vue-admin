/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-04 16:58:53
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-04 17:04:03
 * @FilePath: src/service/module/dict.ts
 * @Description: 字典管理相关接口
 */

import xltRequest from '@/service/request/alova';
import { TDictListResult,IDictType,TDictDetailResult,TDictDataListResult,IDictData } from "@/service/interface/dict";

/**
 * @description 获取字典列表
 * @param {string}  name 字典名称或者字典编码
 */
export const getDictList = (name?: string) => {
    return xltRequest.Get<TDictListResult>("/dict/list", { params: { name } });
};

/**
 * @description 添加字典
 * @param {IDictType}  data 字典数据
 * @param {string}  data.dictName 字典名称
 * @param {string}  data.dictCode 字典编码
 * @param {string}  data.dictDesc 字典描述
 * @param {string}  data.systemFlag 系统标识
 */
export const addDict = (data: IDictType) => {
    return xltRequest.Post("/dict/add", data);
};

/**
 * @description 更新字典
 * @param {IDictType}  data 字典数据
 * @param {string}  data.dictName 字典名称
 * @param {string}  data.dictCode 字典编码
 * @param {string}  data.dictDesc 字典描述
 * @param {string}  data.systemFlag 系统标识
 * @param {string}  data.id 字典ID
 */
export const updateDict = (data: IDictType) => {
    return xltRequest.Post("/dict/update", data);
};

/**
 * @description 删除字典
 * @param {number} id 字典ID
 */
export const removeDict = (id: any) => {
    return xltRequest.Delete(`/dict/remove/${id}`);
};

/**
 * @description 获取字典详情
 * @param {number} id 字典ID
 */
export const getDictDetail = (id: any) => {
    return xltRequest.Get<TDictDetailResult>(`/dict/detail/${id}`);
};

/**
 * @description 获取字典数据列表
 * @param {number} typeId 字典类型ID
 * @param {number} current 当前页
 * @param {number} size 每页条数
 */
export const getDictDataList = (typeId: number, current: number, size: number) => {
    return xltRequest.Get<TDictDataListResult>("/dict/data/list", {
        params: {
            typeId,
            current,
            size
        }
    });
};

/**
 * @description 添加字典数据
 * @param {IDictData}  data 字典数据
 * @param {string}  data.dictValue 字典值
 * @param {string}  data.dictLabel 字典标签
 * @param {string}  data.dictRemark 字典备注
 * @param {number}  data.dictSort 字典排序
 * @param {number}  data.dictTypeId 字典类型ID
 */
export const addDictData = (data: IDictData) => {
    return xltRequest.Post("/dict/data/add", data);
};

/**
 * @description 更新字典数据
 * @param {IDictData}  data 字典数据
 * @param {string}  data.dictValue 字典值
 * @param {string}  data.dictLabel 字典标签
 * @param {string}  data.dictRemark 字典备注
 * @param {number}  data.dictSort 字典排序
 * @param {number}  data.dictTypeId 字典类型ID
 * @param {number}  data.id 字典数据ID
 */
export const updateDictData = (data: IDictData) => {
    return xltRequest.Post("/dict/data/update", data);
};

/**
 * @description 删除字典数据
 * @param {number} id 字典数据ID
 */
export const removeDictData = (id: any) => {
    return xltRequest.Delete(`/dict/data/remove/${id}`);
};

/**
 * @description 获取字典数据详情
 * @param id
 */
export const getDictDataDetail = (id: any) => {
    return xltRequest.Get<IDictData>(`/dict/data/detail/${id}`);
};

/**
 * @description 根据字典类型获取字典数据列表
 * @param {string} dictType 字典类型名称
 */
export const getDictDataListByType = (dictType: string) => {
    return xltRequest.Get<any>(`/dict/data/type-detail/${dictType}`);
};

/**
 * @description 根据字典类型获取字典数据列表
 * @param {string} dictType 字典类型名称
 */
export const getDictDataObjByType = (dictType: string) => {
    return xltRequest.Get<TDictDataListResult>(`/dict/data/type-detail`, {
        params: {
            type: dictType
        }
    });
};
