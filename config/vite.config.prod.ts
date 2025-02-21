/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-20 23:03:22
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-21 00:14:41
 * @FilePath: config/vite.config.prod.ts
 * @Description: 生产环境vite配置
 */
import { mergeConfig, UserConfig } from 'vite';
import viteConfigBase from './vite.config.base.ts';
import configCompressPlugin from './plugin/compress.ts';
import configVisualizerPlugin from './plugin/visualizer.ts';

export default mergeConfig<UserConfig, Record<string, any>>(
    {
        mode: 'production',
        plugins: [configCompressPlugin('gzip'), configVisualizerPlugin()],
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        vue: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
                    },
                },
            },
            chunkSizeWarningLimit: 2000,
        },
    },
    viteConfigBase,
);
