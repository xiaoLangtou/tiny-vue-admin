/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-23 14:18:55
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-23 14:19:04
 * @FilePath: src/utils/index.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
export const findIdx = (el: Element) => {
    let idx = 0;
    let cur = el;
    while (cur) {
        idx += 1;
        cur = cur.previousElementSibling;
    }
    return idx;
};
