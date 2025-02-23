/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-20 22:09:35
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-22 19:09:43
 * @FilePath: config/vite.config.base.ts
 * @Description: vite基础配置
 */
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import AutoComponent from 'unplugin-vue-components/vite';
import { TinyVueResolver } from '@opentiny/unplugin-tiny-vue';
import AutoImport from 'unplugin-auto-import/vite';

const config = {
    plugins: [
        vue(),
        vueJsx(),
        AutoComponent({
            dts: './src/types/components.d.ts',
            globs: ['src/components/*/index.vue'],
            resolvers: [TinyVueResolver],
        }),
        AutoImport({
            imports: ['vue', 'vue-router', 'pinia'],
            dts: './src/types/auto-imports.d.ts',
            resolvers: [TinyVueResolver],
            eslintrc: {
                enabled: false, // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
                filepath: './.eslintrc-auto-import.json',
                globalsPropValue: true,
            },
        }),
    ],
    build: {
        outDir: resolve(__dirname, '../dist'),
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
    resolve: {
        alias: [
            {
                find: '@',
                replacement: resolve(__dirname, '../src'),
            },
            {
                find: 'assets',
                replacement: resolve(__dirname, '../src/assets'),
            },
        ],
        extensions: ['.js', '.ts', '.vue'],
    },
};

export default defineConfig(config);
