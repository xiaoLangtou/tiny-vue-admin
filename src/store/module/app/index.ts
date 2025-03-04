import { defineStore } from 'pinia';
import { theme as antdTheme } from 'ant-design-vue/es';
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';
import globalSetting from '@/global/setting';
import type { ThemeType } from './types';
import { lightThemeColors, darkThemeColors, menuDarkColors, menuLightColors } from './colors'; // 引入颜色配置

// 定义主题类型接口
export interface ILayoutSetting {
    title: string;
    theme?: any; // 明确 theme 的类型
    colorPrimary: string;
    compactAlgorithm?: boolean;

    [key: string]: any;
}

// 使用 useDark 和 useToggle 实现主题切换
export const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: 'light',
    onChanged(dark: boolean) {
        document.documentElement.setAttribute('class', dark ? 'dark' : 'light');
    },
});
export const toggleDark = useToggle(isDark);

const useAppStore = defineStore('app', () => {
    // 初始化主题和布局设置
    const theme = ref<ThemeType>(isDark.value ? 'dark' : 'light');
    const layoutSetting = reactive<ILayoutSetting>(globalSetting);
    const antdThemeOptions = {
        darkAlgorithm: antdTheme.darkAlgorithm,
        compactAlgorithm: antdTheme.compactAlgorithm,
        defaultAlgorithm: antdTheme.defaultAlgorithm,
    };
    // 初始化主题配置
    const themeConfig = reactive<ThemeConfig>({
        algorithm: [antdTheme.defaultAlgorithm],
        token: {
            colorBgContainer: lightThemeColors.colorBgContainer,
            colorBgLayout: lightThemeColors.colorBgLayout,
            colorPrimary: globalSetting.colorPrimary,
            borderRadius: globalSetting.borderRadius,
        },
        components: {},
    });

    // 更新主题颜色
    const setThemeColors = (theme: ThemeType) => {
        if (theme === 'dark') {
            themeConfig.token!.colorBgContainer = darkThemeColors.colorBgContainer;
            themeConfig.token!.colorBgLayout = darkThemeColors.colorBgLayout;
        } else {
            themeConfig.token!.colorBgContainer = lightThemeColors.colorBgContainer;
            themeConfig.token!.colorBgLayout = lightThemeColors.colorBgLayout;
        }
    };

    // 更新菜单组件的颜色
    const setMenuStyles = (theme: ThemeType) => {
        if (!themeConfig.components) return;
        themeConfig.components.Menu =
            theme === 'dark'
                ? {
                      ...menuDarkColors,
                      colorItemBgSelected: themeConfig.token?.colorPrimary,
                  }
                : menuLightColors;
    };

    const toggleColorPrimary = (color: string) => {
        layoutSetting.colorPrimary = color;
        if (themeConfig.token) {
            themeConfig.token.colorPrimary = color;
        }
        setMenuStyles(layoutSetting.theme);
    };

    // 切换主题
    const toggleTheme = (theme: ThemeType) => {
        layoutSetting.theme = theme;
        toggleCompact(layoutSetting.compactAlgorithm); // 更新 compact 设置
        setThemeColors(theme); // 更新背景颜色
        setMenuStyles(theme); // 更新菜单样式

        if (theme === 'dark') {
            toggleDark(true); // 启用 dark 模式
        } else {
            toggleDark(false); // 关闭 dark 模式
        }
    };

    // 切换紧凑模式
    const toggleCompact = (isCompact = true) => {
        layoutSetting.compactAlgorithm = isCompact;

        const algorithms = isDark.value ? [antdThemeOptions.darkAlgorithm] : [antdThemeOptions.defaultAlgorithm];
        if (isCompact) algorithms.push(antdThemeOptions.compactAlgorithm);

        themeConfig.algorithm = algorithms; // 更新主题算法
    };

    // 切换导航模式
    const toggleLayout = (layout: string) => {
        layoutSetting.layout = layout;
    };

    // 切换页面圆角
    const toggleBorderRadius = (radius: number) => {
        layoutSetting.borderRadius = radius;
        themeConfig.token!.borderRadius = radius;
    };

    // 监听 dark 模式变化
    watch(
        () => isDark.value,
        (darkMode) => {
            theme.value = darkMode ? 'dark' : 'light'; // 更新主题
            toggleTheme(theme.value); // 切换主题
        },
        { immediate: true }, // 初始化时立即执行
    );

    return {
        theme,
        layoutSetting,
        themeConfig,
        toggleTheme,
        toggleCompact,
        toggleColorPrimary,
        toggleDark,
        toggleBorderRadius,
        toggleLayout
    };
});

export default useAppStore;
