/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2024-12-05 10:47:02
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-13 16:48:16
 * @FilePath: rsbuild.config.ts
 * @Description: https://rsbuild.dev/zh/guide/start/index
 */
import { defineConfig, loadEnv } from '@rsbuild/core';
import dayjs from 'dayjs';
import { resolve } from 'path';
import { createPluginsTs } from './config/plugin/plugins';
import { createProxy, wrapperEnv } from './config/utils';
import pkg from './package.json';

const { publicVars } = loadEnv({ prefixes: ['VITE_'] });
const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
    pkg: { dependencies, devDependencies, name, version },
    lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

export default defineConfig(() => {
    // 将环境变量的值转换并注入到项目中
    const __APP_ENV__ = wrapperEnv(publicVars);
    const { rspackPlugins, rsbuildPlugins } = createPluginsTs();
    
    return {
        source: {
            entry: {
                index: './src/main.ts',
            },
            define: {
                ...publicVars,
                __APP_INFO__: JSON.stringify(__APP_INFO__),
            },
        },
        html: {
            template: './index.html',
            title: process.env.VITE_GLOB_APP_TITLE,
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
                'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
            },
        },
        server: {
            host: '0.0.0.0',
            port: __APP_ENV__['import.meta.env.VITE_PORT'],
            open: __APP_ENV__['import.meta.env.VITE_OPEN'],
            proxy: createProxy(__APP_ENV__['import.meta.env.VITE_PROXY']),
        },
        dev: {
            lazyCompilation: true,
            assetPrefix: process.env.VITE_PUBLIC_PATH,
            liveReload: false,
        },
        // output: {
        //     polyfill: 'off',
        //     target: 'web', // 默认 environment
        //     minify: true,
        //     sourceMap: true,
        //     assetPrefix: process.env.VITE_PUBLIC_PATH,
        //     dataUriLimit: {
        //         image: 5000,
        //         media: 0,
        //     },
        // },
        tools: {
            rspack: (config, { appendPlugins }) => {
                appendPlugins(rspackPlugins);
            },
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        name: 'vendors',
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        chunks: 'initial',
                    },
                    common: {
                        name: 'common',
                        minChunks: 2,
                        priority: -20,
                        chunks: 'initial',
                        reuseExistingChunk: true,
                    },
                },
            },
        },
        performance: {
            /**
             * 代码拆包策略
             * @description:https://rsbuild.dev/zh/guide/optimization/split-chunk
             * split-by-experience:经验策略;
             * split-by-module npm包策略;
             * split-by-size 模块大小策略;
             * all-in-one 不拆包策略;
             * single-vendor 所有npm包一个chunk策略;
             * custom 自定义策略
             */
            chunkSplit: {
                strategy: 'split-by-module',
            },
            /**
             * 在生产模式构建时，是否自动移除代码中的 console.[methodName]
             * @description:https://rsbuild.dev/zh/config/performance/remove-console
             * ConsoleType = 'log' | 'info' | 'warn' | 'error' | 'table' | 'group';
             * removeConsole 为数组时，移除指定的 console 方法
             * removeConsole 为 true 时，移除所有 console 方法
             * removeConsole 为 false 时，不移除 console 方法
             */
            removeConsole: ['log', 'info', 'warn'],
        },
        plugins: [...rsbuildPlugins],
    };
});
