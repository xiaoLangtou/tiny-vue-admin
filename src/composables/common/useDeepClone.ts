import { Ref, unref } from 'vue';

export const useDeepClone = <
    T extends {
        [x: string]: any;
    },
>(
    value: T | Ref<T>,
): T => {
    const innerValue = unref(value);

    // 处理null 和 undefined
    if (value === null || value === undefined) {
        return value;
    }

    // 处理基本类型
    if (typeof innerValue !== 'object') {
        return innerValue;
    }

    // 处理数组
    const data = Object.create(null);
    if (innerValue instanceof Array) {
        const arr = [];
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < innerValue.length; i += 1) {
            arr.push(useDeepClone(innerValue[i]));
        }
        return arr as unknown as T;
    }
    const entries = Object.entries(innerValue);
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < entries.length; i += 1) {
        const [key, v] = entries[i];
        if (typeof v !== 'object') {
            data[key] = v;
        }
        if (typeof v === 'function') {
            data[key] = v;
        }
        data[key] = useDeepClone(v);
    }
    return data;
};
