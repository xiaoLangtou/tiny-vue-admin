/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-17 17:14:35
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-28 16:38:07
 * @FilePath: tailwind.config.js
 * @Description: tailwindcss 配置文件
 */
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#6366f1', // 主色
                    light: '#f0f3ff', // 主色浅色背景
                    dark: '#575ad0', // 主色深色
                    hover: '#9197ff', // 主色悬浮
                    active: '#4c49cc', // 主色激活态
                    text: '#6366f1', // 主色文本
                    textHover: '#9197ff', // 主色文本悬浮
                    textActive: '#4c49cc', // 主色文本激活
                },
                success: {
                    DEFAULT: '#52c41a', // 成功色
                    light: '#f6ffed', // 成功色浅色背景
                    dark: '#49aa19', // 成功色深色
                    hover: '#95de64', // 成功色悬浮
                    active: '#389e0d', // 成功色激活态
                    text: '#52c41a', // 成功色文本
                    textHover: '#73d13d', // 成功色文本悬浮
                    textActive: '#389e0d', // 成功色文本激活
                },
                warning: {
                    DEFAULT: '#faad14', // 警戒色
                    light: '#fffbe6', // 警戒色浅色背景
                    dark: '#d89614', // 警戒色深色
                    hover: '#ffd666', // 警戒色悬浮
                    active: '#d48806', // 警戒色激活态
                    text: '#faad14', // 警戒色文本
                    textHover: '#ffc53d', // 警戒色文本悬浮
                    textActive: '#d48806', // 警戒色文本激活
                },
                error: {
                    DEFAULT: '#ff4d4f', // 错误色
                    light: '#fff2f0', // 错误色浅色背景
                    dark: '#dc4446', // 错误色深色
                    hover: '#ff7875', // 错误色悬浮
                    active: '#d9363e', // 错误色激活态
                    text: '#ff4d4f', // 错误色文本
                    textHover: '#ff7875', // 错误色文本悬浮
                    textActive: '#d9363e', // 错误色文本激活
                },
                info: {
                    DEFAULT: '#6366f1', // 信息色
                    light: '#f0f3ff', // 信息色浅色背景
                    dark: '#4d50b4', // 信息色深色
                    hover: '#bac0ff', // 信息色悬浮
                    active: '#40428e', // 信息色激活态
                    text: '#6366f1', // 信息色文本
                    textHover: '#9197ff', // 信息色文本悬浮
                    textActive: '#4c49cc', // 信息色文本激活
                },
                text: {
                    DEFAULT: 'rgba(0, 0, 0, 0.88)', // 一级文本色
                    secondary: 'rgba(0, 0, 0, 0.65)', // 二级文本色
                    tertiary: 'rgba(0, 0, 0, 0.45)', // 三级文本色
                    quaternary: 'rgba(0, 0, 0, 0.25)', // 四级文本色
                    dark: 'rgba(255, 255, 255, 0.85)', // 暗模式下的文本色
                    darkSecondary: 'rgba(255, 255, 255, 0.65)', // 暗模式下的二级文本色
                    darkTertiary: 'rgba(255, 255, 255, 0.45)', // 暗模式下的三级文本色
                    darkQuaternary: 'rgba(255, 255, 255, 0.25)', // 暗模式下的四级文本色
                },
                border: {
                    DEFAULT: '#d9d9d9', // 一级边框色
                    secondary: '#f0f0f0', // 二级边框色
                    dark: '#424242', // 暗模式边框色
                    darkSecondary: '#303030', // 暗模式二级边框色
                },
                fill: {
                    DEFAULT: 'rgba(0, 0, 0, 0.15)', // 一级填充色
                    secondary: 'rgba(0, 0, 0, 0.06)', // 二级填充色
                    tertiary: 'rgba(0, 0, 0, 0.04)', // 三级填充色
                    quaternary: 'rgba(0, 0, 0, 0.02)', // 四级填充色
                    dark: 'rgba(255, 255, 255, 0.18)', // 暗模式下的一级填充色
                    darkSecondary: 'rgba(255, 255, 255, 0.12)', // 暗模式下的二级填充色
                    darkTertiary: 'rgba(255, 255, 255, 0.08)', // 暗模式下的三级填充色
                    darkQuaternary: 'rgba(255, 255, 255, 0.04)', // 暗模式下的四级填充色
                },
                bg: {
                    container: '#ffffff', // 组件容器背景色
                    elevated: '#ffffff', // 浮层容器背景色
                    layout: '#f5f5f5', // 布局背景色
                    spotlight: 'rgba(0, 0, 0, 0.85)', // 引起注意的背景色
                    mask: 'rgba(0, 0, 0, 0.45)', // 浮层的背景蒙层颜色
                    darkContainer: 'rgb(30 41 59)', // 暗模式下的组件容器背景色
                    darkElevated: '#1f1f1f', // 暗模式下的浮层容器背景色
                    darkLayout: 'rgb(15 23 42)!important', // 暗模式下的布局背景色
                    darkSpotlight: '#424242', // 暗模式下的引起注意的背景色
                    darkMask: 'rgba(0, 0, 0, 0.45)', // 暗模式下的浮层的背景蒙层颜色
                },
            },
        },
    },
};
