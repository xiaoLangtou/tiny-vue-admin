import { ACCESS_TOKEN } from '@/global/constants.ts';

/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-18 14:45:41
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-18 16:28:34
 * @FilePath: src/service/request/config/index.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
export default {
    // 请求基础路径
    baseURL: import.meta.env.VITE_API_URL as string,
    // 超时时间
    timeout: 10000,
    // token名称
    tokenName: ACCESS_TOKEN,
};
