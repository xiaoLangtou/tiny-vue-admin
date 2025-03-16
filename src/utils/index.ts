/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-23 14:18:55
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-15 12:33:22
 * @FilePath: src/utils/index.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
export const findIdx = (el: Element) => {
    let idx = 0;
    let cur = el;
    while (cur) {
        idx += 1;
        cur = (cur.previousElementSibling ? cur.previousElementSibling : null) as Element;
    }
    return idx;
};


/**
 * @description 生成唯一 uuid
 * @returns {String}
 */
export function generateUUID() {
    let uuid = "";
    for (let i = 0; i < 32; i++) {
        const random = (Math.random() * 16) | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) uuid += "-";
        uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
    }
    return uuid;
}
