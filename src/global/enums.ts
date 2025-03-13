/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 14:01:57
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-12 12:36:33
 * @FilePath: src/global/enums.ts
 * @Description: 全局所有的枚举
 */
/**
 * @description：请求配置
 */
export enum ResultEnum {
    SUCCESS = 200,
    ERROR = 500,
    OVERDUE = 401,
    TIMEOUT = 30000,
    TYPE = 'success',
}

/**
 * @description：请求方法
 */
export enum RequestEnum {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

/**
 * @description：常用的 contentTyp 类型
 */
export enum ContentTypeEnum {
    // json
    JSON = 'application/json;charset=UTF-8',
    // text
    TEXT = 'text/plain;charset=UTF-8',
    // form-data 一般配合qs
    FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
    // form-data 上传
    FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

export const FROZEN_STATUS: Record<string, string> = {
    NORMAL: '启用',
    FROZEN: '禁用',
};

export const SEX_STATUS = {
    1: '男',
    2: '女',
    3: '未知',
};

export enum HTTP_METHOD {
    GET = 'GET', // 获取资源
    POST = 'POST', // 提交数据
    PUT = 'PUT', // 更新资源
    DELETE = 'DELETE', // 删除资源
    PATCH = 'PATCH', // 局部更新资源
    HEAD = 'HEAD', // 获取响应头
    OPTIONS = 'OPTIONS', // 获取可用方法
    TRACE = 'TRACE', // 追踪请求路径
    CONNECT = 'CONNECT', // 建立隧道连接
}

export enum MenuLayoutMode {
    DEFAULT = 'default',
    TOP = 'top',
    MIX = 'mix',
}

export const HttpMethodCN: Record<HTTP_METHOD, string> = {
    [HTTP_METHOD.GET]: '获取',
    [HTTP_METHOD.POST]: '提交',
    [HTTP_METHOD.PUT]: '更新',
    [HTTP_METHOD.DELETE]: '删除',
    [HTTP_METHOD.PATCH]: '修改',
    [HTTP_METHOD.HEAD]: '头信息',
    [HTTP_METHOD.OPTIONS]: '选项',
    [HTTP_METHOD.TRACE]: '追踪',
    [HTTP_METHOD.CONNECT]: '连接',
};
