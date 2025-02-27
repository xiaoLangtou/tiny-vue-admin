/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-19 20:40:19
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-27 14:00:41
 * @FilePath: src/store/module/app/index.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { defineStore } from 'pinia';
import type { ThemeType } from './types';
import { theme as antdTheme } from 'ant-design-vue/es';
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';
import globalSetting from '@/global/setting';

export interface ILayoutSetting {
    title: string;
    theme?: string;
    colorPrimary: string;
    compactAlgorithm?: boolean;

    [key: string]: any;
}

export const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: 'light',
});

export const toggleDark = useToggle(isDark);

const useAppStore = defineStore('app', () => {
    const theme = ref(isDark.value ? 'dark' : 'light');
    const antdThemeOptions = {
        darkAlgorithm: antdTheme.darkAlgorithm,
        compactAlgorithm: antdTheme.compactAlgorithm,
        defaultAlgorithm: antdTheme.defaultAlgorithm,
    };
    const layoutSetting = reactive<ILayoutSetting>(globalSetting);
    const themeConfig = reactive<ThemeConfig>({
        algorithm: [antdTheme.defaultAlgorithm],
        token: {
            colorBgContainer: '#FFF',
            colorBgLayout: '#FFF',
            colorPrimary: globalSetting.colorPrimary,
        },
        components: {},
    });

    const toggleTheme = (theme: ThemeType) => {
        toggleCompact(layoutSetting.compactAlgorithm);
        layoutSetting.theme = theme;
        if (['light', 'inverted'].includes(theme)) {
            if (themeConfig.token) {
                themeConfig.token.colorBgContainer = '#FFF';
                themeConfig.token.colorBgLayout = '#FFF';
                console.log(themeConfig.token.colorBgContainer);
            }
            if (themeConfig.components?.Menu) {
                delete themeConfig.components.Menu;
            }
            toggleDark(false);
        } else if (theme === 'dark') {
            toggleDark(true);
            if (themeConfig.token) {
                themeConfig.token.colorBgContainer = 'rgb(30 41 59)';
                themeConfig.token.colorBgLayout = 'rgb(30 41 59)';
            }
            if (themeConfig.components) {
                themeConfig.components = {
                    ...themeConfig.components,
                    Menu: {
                        colorItemBg: 'rgb(15 23 42)',
                        colorSubItemBg: 'rgb(30 41 59)',
                        menuSubMenuBg: 'rgb(30 41 59)',
                        colorItemBgSelected: themeConfig.token?.colorPrimary ?? '#1677ff',
                        colorItemBgHover: 'rgb(30 41 59)',
                        colorItemTextSelected: '#fff',
                    } as any,
                };
            }
        }
    };

    const toggleCompact = (isCompact = true) => {
        if (Array.isArray(themeConfig.algorithm)) {
            const index = themeConfig.algorithm.findIndex((item) => item === antdThemeOptions.compactAlgorithm);
            if (index >= 0 && isCompact) return;
        }

        layoutSetting.compactAlgorithm = isCompact;

        const algorithm = isDark.value ? [antdThemeOptions.darkAlgorithm] : [antdThemeOptions.defaultAlgorithm];
        isCompact && algorithm.push(antdThemeOptions.compactAlgorithm);
        themeConfig.algorithm = algorithm;
    };

    watch(
        () => isDark.value,
        (isDark) => {
            console.log(isDark);
            if (isDark) {
                toggleTheme('dark');
                theme.value = 'dark';
            } else {
                toggleTheme('light');
                theme.value = 'light';
            }
        },
        { immediate: true },
    );

    return {
        theme,
        antdThemeOptions,
        layoutSetting,
        themeConfig,
        toggleTheme,
        toggleCompact,
    };
});
export default useAppStore;
