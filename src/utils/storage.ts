import { GLOBAl_STORAGE_PREFIX } from '@/global/constants';

/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-18 15:22:21
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-13 17:28:08
 * @FilePath: src/utils/storage.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
export class StorageUtil {
    // 设置全局缓存前缀
    public static prefix: string = GLOBAl_STORAGE_PREFIX;
    private static defaultExpire: number | null = null; // 默认过期时间,null表示永不过期
    private static storage: Storage = window.localStorage; // 默认使用localStorage
    private static sessionStorage: Storage = window.sessionStorage;
    private static watchers: Map<string, (newValue: any, oldValue: any) => void> = new Map(); // 监听器

    /**
     * 设置全局配置
     * @param {object} config
     * @param {string} [config.prefix] - 全局缓存前缀
     * @param {number} [config.defaultExpire] - 默认过期时间
     */
    public static config(config: { prefix?: string; defaultExpire?: number }): void {
        if (config.prefix) {
            StorageUtil.prefix = config.prefix;
        }
        if (config.defaultExpire !== undefined) {
            StorageUtil.defaultExpire = config.defaultExpire;
        }
    }

    /**
     * 设置缓存
     * @param key 缓存key
     * @param value 缓存value
     * @param [expireSeconds] 过期时间（秒），可选
     * @param useSession 是否使用sessionStorage，默认使用localStorage
     */
    public static set<T>(
        key: string,
        value: T,
        expireSeconds: number = StorageUtil.defaultExpire!,
        useSession = false,
    ) {
        const fullKey = StorageUtil.getKey(key);
        const storage = StorageUtil.getStorage(useSession);
        const data = {
            value,
            expire: expireSeconds ? Date.now() + expireSeconds * 1000 : null,
        };

        if (StorageUtil.isStorageFull()) {
            StorageUtil.clearOldestDataIfStorageFull();
        }
        storage.setItem(fullKey, JSON.stringify(data));

        // 手动触发 watch 回调
        StorageUtil.triggerWatch(key, value, null);
    }

    /**
     * 获取数据
     * @param  key 缓存key
     * @param  useSession 是否使用sessionStorage，默认使用localStorage
     * @return {T | null} 返回key对应的value，如果key不存在或者已过期则返回null
     */
    public static get<T>(key: string, useSession = false): T | null {
        const fullKey = StorageUtil.getKey(key);
        const storage = StorageUtil.getStorage(useSession);
        const data = storage.getItem(fullKey);
        if (!data) {
            return null;
        }
        try {
            const { value, expire } = JSON.parse(data) as { value: T; expire: number | null };
            if (expire && Date.now() > expire) {
                StorageUtil.remove(key, useSession);
                return null;
            }
            return value;
        } catch (e) {
            console.error(`get storage error,key:${fullKey}`, e);
            return null;
        }
    }

    /**
     * 清除对应key的缓存
     * @param key 键
     * @param useSession 是否使用sessionStorage，默认使用localStorage
     */
    public static remove(key: string, useSession = false): void {
        const fullKey = StorageUtil.getKey(key);
        const storage = StorageUtil.getStorage(useSession);
        const oldValue = StorageUtil.get(key, useSession);
        storage.removeItem(fullKey);
        // 触发 watch 监听
        StorageUtil.triggerWatch(key, null, oldValue);
    }

    /**
     * 清除所有缓存（仅清理带有前缀的数据）
     * @param useSession
     */
    public static clear(useSession = false): void {
        const storage = StorageUtil.getStorage(useSession);
        Object.keys(storage).forEach((key) => {
            if (key.startsWith(StorageUtil.prefix)) {
                storage.removeItem(key);
            }
        });
    }

    /**
     * 清除所有过期的缓存
     * @param useSession 是否使用sessionStorage，默认使用localStorage
     */
    public static cleanExpiredKeys(useSession = false): void {
        const storage = StorageUtil.getStorage(useSession);
        Object.keys(storage).forEach((key) => {
            if (key.startsWith(StorageUtil.prefix)) {
                const data = storage.getItem(key);
                if (!data) {
                    return;
                }
                try {
                    const { expire } = JSON.parse(data) as { value: any; expire: number | null };
                    if (expire && Date.now() > expire) {
                        storage.removeItem(key);
                    }
                } catch (e) {
                    console.error(`cleanExpiredKeys error,key:${key}`, e);
                }
            }
        });
    }

    /**
     * 监听某个key 的变化
     * @param key
     * @param callback 变化时触发的回调
     */
    public static watch<T>(key: string, callback: (newValue: T | null, oldValue: T | null) => void): void {
        const fullKey = StorageUtil.getKey(key);
        StorageUtil.watchers.set(fullKey, callback);
    }

    /**
     * 取消监听某个key 的变化
     * @param key 需要取消的key
     */
    public static unwatch(key: string): void {
        const fullKey = StorageUtil.getKey(key);
        StorageUtil.watchers.delete(fullKey);
    }

    /**
     * 触发监听回调
     * @param key 监听的key
     * @param newValue
     * @param oldValue
     */
    public static triggerWatch<T>(key: string, newValue: T | null, oldValue?: T | null): void {
        const fullKey = StorageUtil.getKey(key);
        if (StorageUtil.watchers.has(fullKey)) {
            StorageUtil.watchers.get(fullKey)!(newValue, oldValue);
        }
    }

    /**
     * 检查存储空间并删除最早过期的数据
     * @returns void
     */
    private static clearOldestDataIfStorageFull(): void {
        // 如果存储已满，删除最早过期的数据
        const storage = StorageUtil.storage;
        const keys = Object.keys(storage)
            .filter((key) => key.startsWith(StorageUtil.prefix))
            .map((key) => {
                const item = storage.getItem(key);
                if (!item) return null;
                try {
                    const { expire } = JSON.parse(item) as { expire: number | null };
                    return { key, expire: expire || Infinity };
                } catch {
                    return null;
                }
            })
            .filter((item) => item !== null) as { key: string; expire: number }[];

        keys.sort((a, b) => a.expire - b.expire);
        if (keys.length > 0) {
            storage.removeItem(keys[0].key); // 删除最早过期的数据
        }
    }

    /**
     * 生成带前缀的key
     * @param {string} key - key
     * @private
     */
    private static getKey(key: string): string {
        return `${StorageUtil.prefix}${key}`;
    }

    /**
     * 判断缓存内存是否已满
     * @private
     */
    private static isStorageFull(): boolean {
        try {
            const testKey = '__storage_test__';
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return false;
        } catch (e: any) {
            return e instanceof DOMException && (e.name === 'QuotaExceededError' || e.code === 22);
        }
    }

    /**
     * 设置存储对象
     * @param  useSession - 是否使用sessionStorage，默认使用localStorage
     * @private
     */
    private static getStorage(useSession = false): Storage {
        return useSession ? StorageUtil.sessionStorage : StorageUtil.storage;
    }
}

window.addEventListener('storage', (event) => {
    if (event.key && event.key.startsWith(StorageUtil.prefix)) {
        const key = event.key.replace(StorageUtil.prefix, '');
        const newValue = event.newValue ? JSON.parse(event.newValue).value : null;
        const oldValue = event.oldValue ? JSON.parse(event.oldValue).value : null;
        StorageUtil.triggerWatch(key, newValue, oldValue);
    }
});
