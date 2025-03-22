/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-19 17:57:07
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-19 18:07:55
 * @FilePath: src/utils/relative-time.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
/**
 * 相对时间工具类
 * 用于将日期时间转换为相对时间表示
 *
 * @example RelativeTimeFormatter.format("2019-05-24T17:28:54.742Z")
 */
export class RelativeTimeFormatter {
    /**
     * 将日期时间字符串转换为相对时间表示
     *
     * @param value 需要格式化的日期时间字符串
     * @param locale 可选，指定语言环境，默认使用浏览器语言
     * @returns 格式化后的相对时间字符串
     */
    public static format(value: string | Date, locale?: string): string {
        const now = new Date();
        const date = value instanceof Date ? value : new Date(value);

        // 检查日期是否有效
        if (isNaN(date.getTime())) {
            throw new Error(`Invalid date argument: '${value}'`);
        }

        // 使用浏览器语言或指定的语言
        const userLocale = locale || (typeof navigator !== 'undefined' ? navigator.language : 'zh-CN');

        // 计算时间差（毫秒）
        const diffInMilliSecs = date.getTime() - now.getTime();
        const diffInSecs = Math.trunc(diffInMilliSecs / 1000);

        // 取绝对差值
        const absDiffInSecs = Math.abs(diffInSecs);

        // 根据时间差大小选择合适的时间单位
        switch (true) {
            case absDiffInSecs < 60: {
                const formatter = new Intl.RelativeTimeFormat(userLocale, { numeric: 'auto' });
                return formatter.format(diffInSecs, 'second');
            }
            case absDiffInSecs >= 60 && absDiffInSecs < 3600: {
                const formatter = new Intl.RelativeTimeFormat(userLocale, { numeric: 'auto' });
                const minutes = Math.trunc(diffInSecs / 60);
                return formatter.format(minutes, 'minute');
            }
            case absDiffInSecs >= 3600 && absDiffInSecs < 86400: {
                const formatter = new Intl.RelativeTimeFormat(userLocale, { numeric: 'auto' });
                const hours = Math.trunc(diffInSecs / 3600);
                return formatter.format(hours, 'hour');
            }
            case absDiffInSecs >= 86400 && absDiffInSecs < 604800: {
                const formatter = new Intl.RelativeTimeFormat(userLocale, { numeric: 'auto' });
                const days = Math.trunc(diffInSecs / 86400);
                return formatter.format(days, 'day');
            }
            case absDiffInSecs >= 604800 && absDiffInSecs < 2592000: {
                const formatter = new Intl.RelativeTimeFormat(userLocale, { numeric: 'auto' });
                const weeks = Math.trunc(diffInSecs / 604800);
                return formatter.format(weeks, 'week');
            }
            case absDiffInSecs >= 2592000 && absDiffInSecs < 31536000: {
                const formatter = new Intl.RelativeTimeFormat(userLocale, { numeric: 'auto' });
                const months = Math.trunc(diffInSecs / 2592000);
                return formatter.format(months, 'month');
            }
            default: {
                const formatter = new Intl.RelativeTimeFormat(userLocale, { numeric: 'auto' });
                const years = Math.trunc(diffInSecs / 31536000);
                return formatter.format(years, 'year');
            }
        }
    }

    /**
     * 根据时间差和单位返回格式化后的相对时间
     *
     * @param diffInSecs 时间差（秒）
     * @param unit 时间单位
     * @param locale 可选，指定语言环境
     * @returns 格式化后的相对时间字符串
     */
    public static formatByUnit(diffInSecs: number, unit: Intl.RelativeTimeFormatUnit, locale?: string): string {
        const userLocale = locale || (typeof navigator !== 'undefined' ? navigator.language : 'zh-CN');
        const formatter = new Intl.RelativeTimeFormat(userLocale, { numeric: 'auto' });
        return formatter.format(diffInSecs, unit);
    }
}
