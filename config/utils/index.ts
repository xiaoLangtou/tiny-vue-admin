/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-20 22:48:08
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-21 00:09:43
 * @FilePath: config/utils/index.ts
 * @Description: 格式化环境变量
 */
export function wrapperEnv(envConf: Record<string, string>): Record<string, any> {
    const ret: Record<string, any> = {};

    // 转换值的函数
    const convertValue = (key: string, value: string): any => {
        // 移除换行符和包裹的引号
        // eslint-disable-next-line no-param-reassign
        value = value.replace(/\\n/g, "\n").replace(/^['"]|['"]$/g, "");

        // 处理布尔值
        if (value === "true") return true;
        if (value === "false") return false;

        // 处理数字
        if (!isNaN(Number(value))) return Number(value);

        // 尝试解析 JSON 对象
        if (value.startsWith("[") || value.startsWith("{")) {
            try {
                return JSON.parse(value.replace(/\\(["\\])/g, "$1"));
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
    return process.env.REPORT === "true";
}
