/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-20 22:04:59
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-20 22:05:58
 * @FilePath: src/service/module/login.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import xltRequest from '@/service/request';


export function login(data: any) {
    return xltRequest.post({
        url: '/login',
        data,
    });
}
