/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-20 22:48:08
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-25 15:28:22
 * @FilePath: config/utils/index.ts
 * @Description: 格式化环境变量
 */

import type { ProxyOptions } from '@rsbuild/core';

type ProxyItem = [string, string];
type ProxyList = ProxyItem[];
type ProxyTargetList = Record<string, ProxyOptions>;
export function wrapperEnv(envConf: Record<string, string>): Record<string, any> {
    const ret: Record<string, any> = {};

    // 转换值的函数
    const convertValue = (key: string, value: string): any => {
        // 移除换行符和包裹的引号
        value = value.replace(/\\n/g, '\n').replace(/^['"]|['"]$/g, '');

        // 处理布尔值
        if (value === 'true') return true;
        if (value === 'false') return false;

        // 处理数字
        if (!isNaN(Number(value))) return Number(value);

        // 尝试解析 JSON 对象
        if (value.startsWith('[') || value.startsWith('{')) {
            try {
                return JSON.parse(value.replace(/\\(["\\])/g, '$1'));
            } catch (error) {
                console.warn(`Failed to parse JSON for ${key}:`, error);
            }
        }

        // 默认返回字符串
        return value;
    };

    // 遍历环境变量
    for (const [key, value] of Object.entries(envConf)) {
        ret[key] = convertValue(key, value);
    }

    return ret;
}

export function isReportMode(): boolean {
    return process.env.REPORT === 'true';
}

export const createProxy = (list: ProxyList) => {
    const ret: ProxyTargetList = {};

    for (const [prefix, target] of list) {
        const httpsRE = /^https:\/\//;
        const isHttps = httpsRE.test(target);
        ret[prefix] = {
            target,
            changeOrigin: true,
            ws: true,
            pathRewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
            ...(isHttps ? { secure: false } : {}),
        };
    }

    return ret;
};
