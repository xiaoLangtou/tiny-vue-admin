/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-20 22:21:03
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-21 00:14:41
 * @FilePath: config/vite.config.dev.ts
 * @Description: 开发环境vite配置
 */
import { ProxyOptions, mergeConfig, loadEnv } from 'vite';
import baseConfig from './vite.config.base';
import { wrapperEnv } from './utils';

type ProxyItem = [string, string];
type ProxyList = ProxyItem[];
type ProxyTargetList = Record<string, ProxyOptions>;

const env = wrapperEnv(loadEnv('development', process.cwd()));

const createProxy = (list: ProxyList) => {
    const ret: ProxyTargetList = {};

    for (const [prefix, target] of list) {
        const httpsRE = /^https:\/\//;
        const isHttps = httpsRE.test(target);
        ret[prefix] = {
            target,
            changeOrigin: true,
            ws: true,
            rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
            ...(isHttps ? { secure: false } : {}),
        };
    }

    return ret;
};
export default mergeConfig(
    {
        mode: 'development',
        server: {
            open: true,
            port: env['VITE_PORT'] as unknown as number,
            fs: {
                strict: true,
            },
            proxy: createProxy(env['VITE_PROXY'] as unknown as ProxyList),
        },
    },
    baseConfig,
);
