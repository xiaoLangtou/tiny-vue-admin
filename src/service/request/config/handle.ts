/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2024-12-03 17:12:35
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-22 13:54:27
 * @FilePath: src/service/request/config/handle.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

export interface ServiceResult<T> {
  isSuccess: boolean;
  errType: string | null;
  data: T;
}

/**
 * @description 处理服务端返回结果
 * @param  data
 * @param isSuccess
 */
export function handleServiceResult(data: any, isSuccess = true): ServiceResult<any> {
  return {
    isSuccess,
    errType: null,
    ...data
  };
}
