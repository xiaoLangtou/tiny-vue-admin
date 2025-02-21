/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-17 17:14:35
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-21 00:19:24
 * @FilePath: tailwind.config.js
 * @Description: tailwindcss 配置文件
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f7f7fe',
                    100: '#dadafc',
                    200: '#bcbdf9',
                    300: '#9ea0f6',
                    400: '#8183f4',
                    500: '#6366f1',
                    600: '#5457cd',
                    700: '#4547a9',
                    800: '#363885',
                    900: '#282960',
                    950: '#191a3c',
                },
                emerald: {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    200: '#a7f3d0',
                    300: '#6ee7b7',
                    400: '#34d399',
                    500: '#10b981',
                    600: '#059669',
                    700: '#047857',
                    800: '#065f46',
                    900: '#064e3b',
                    950: '#022c22',
                },
                success: {
                    DEFAULT: '#10b981',
                    light: '#ecfdf5',
                },
                error: {
                    DEFAULT: '#ef4444',
                    light: '#fef2f2',
                },
                warning: {
                    DEFAULT: '#f59e0b',
                    light: '#fffbeb',
                },
                info: {
                    DEFAULT: '#0ea5e9',
                    light: '#f0f9ff',
                },
                surface: {
                    0: '#ffffff',
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                },
            },
            borderRadius: {
                none: '0',
                xs: '2px',
                sm: '4px',
                md: '6px',
                lg: '8px',
                xl: '12px',
            },
            boxShadow: {
                select: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
                popover: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
                modal: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                navigation: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
            },
            spacing: {
                xs: '0.375rem', // 6px
                sm: '0.5rem', // 8px
                md: '0.75rem', // 12px
                lg: '1rem', // 16px
                xl: '1.25rem', // 20px
            },
            fontSize: {
                xs: '0.75rem', // 12px
                sm: '0.875rem', // 14px
                base: '1rem', // 16px
                lg: '1.125rem', // 18px
                xl: '1.25rem', // 20px
            },
            transitionDuration: {
                DEFAULT: '200ms',
                150: '150ms',
            },
            opacity: {
                disabled: '0.6',
            },
        },
    },
    plugins: [],
};
