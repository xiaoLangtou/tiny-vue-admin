/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-20 23:17:26
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-21 00:04:23
 * @FilePath: config/plugin/compress.ts
 * @Description: gzip、brotli压缩插件
 */
import type { Plugin } from 'vite';
import compressPlugin from 'vite-plugin-compression';

export default function configCompressPlugin(compress: 'gzip' | 'brotli', deleteOriginFile = false): Plugin | Plugin[] {
    const plugins: Plugin[] = [];

    const compressType: Record<string, any> = {
        gzip: {
            ext: '.gz',
            algorithm: 'gzip',
            deleteOriginFile,
        },
        brotli: {
            ext: '.br',
            algorithm: 'brotliCompress',
            deleteOriginFile,
        },
    };

    const compressConfig = compressType[compress];
    if (!compressConfig) return [];

    plugins.push(compressPlugin({ ...compressConfig }));

    return plugins;
}
