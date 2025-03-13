import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/rspack';
import { AntDesignVueResolver, ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/rspack';

export const createPluginsTs = () => {
    return {
        rspackPlugins: [
            AutoImport({
                imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
                dts: './src/types/auto-imports.d.ts',
                eslintrc: {
                    enabled: true, // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
                    filepath: './.eslintrc-auto-import.js',
                    globalsPropValue: true,
                },
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                dts: './src/types/components.d.ts',
                globs: ['src/components/**/**/index.vue'],
                resolvers: [
                    AntDesignVueResolver({
                        importStyle: false,
                    }),
                ],
            }),
        ],
        rsbuildPlugins: [
            pluginBabel({
                include: /\.(?:jsx|tsx)$/,
            }),
            pluginVue(),
            pluginVueJsx(),
            pluginSass(),
        ],
    };
};
