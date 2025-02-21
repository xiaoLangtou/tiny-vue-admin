const DarkTheme = {
    id: 'tiny-dark-theme',
    name: 'DarkTheme',
    data: {
        // 品牌色
        'tv-base-color-brand': '#8183f4', // primary.400 作为暗色主色
        'tv-base-color-brand-1': '#f7f7fe',
        'tv-base-color-brand-2': '#dadafc',
        'tv-base-color-brand-3': '#bcbdf9',
        'tv-base-color-brand-4': '#9ea0f6',
        'tv-base-color-brand-5': '#8183f4',
        'tv-base-color-brand-6': '#6366f1',
        'tv-base-color-brand-7': '#5457cd',
        'tv-base-color-brand-8': '#4547a9',
        'tv-base-color-brand-9': '#363885',
        'tv-base-color-brand-10': '#282960',
        'tv-base-color-brand-11': '#191a3c',

        // 中性色
        'tv-base-color-common-1': '#18181b', // surface.900 作为基础白色的反转
        'tv-base-color-common-2': '#27272a', // surface.800
        'tv-base-color-common-3': '#3f3f46', // surface.700
        'tv-base-color-common-4': '#52525b', // surface.600
        'tv-base-color-common-5': '#71717a', // surface.500
        'tv-base-color-common-6': '#a1a1aa', // surface.400
        'tv-base-color-common-7': '#d4d4d8', // surface.300
        'tv-base-color-common-8': '#e4e4e7', // surface.200
        'tv-base-color-common-9': '#f4f4f5', // surface.100
        'tv-base-color-common-10': '#fafafa', // surface.50
        'tv-base-color-common-11': '#ffffff', // surface.0
        'tv-base-color-common-12': '#09090b', // surface.950

        // Success 颜色使用 emerald 暗色系
        'tv-base-color-success-1': '#064e3b', // emerald.900
        'tv-base-color-success-2': '#065f46', // emerald.800
        'tv-base-color-success-3': '#047857', // emerald.700
        'tv-base-color-success-4': '#059669', // emerald.600
        'tv-base-color-success-5': '#10b981', // emerald.500
        'tv-base-color-success-6': '#34d399', // emerald.400
        'tv-base-color-success-7': '#6ee7b7', // emerald.300
        'tv-base-color-success-8': '#a7f3d0', // emerald.200
        'tv-base-color-success-9': '#d1fae5', // emerald.100
        'tv-base-color-success-10': '#ecfdf5', // emerald.50
        'tv-base-color-success-11': '#022c22', // emerald.950

        // Error 颜色使用 red 暗色系
        'tv-base-color-error-1': '#7f1d1d', // red.900
        'tv-base-color-error-2': '#991b1b', // red.800
        'tv-base-color-error-3': '#b91c1c', // red.700
        'tv-base-color-error-4': '#dc2626', // red.600
        'tv-base-color-error-5': '#ef4444', // red.500
        'tv-base-color-error-6': '#f87171', // red.400
        'tv-base-color-error-7': '#fca5a5', // red.300
        'tv-base-color-error-8': '#fecaca', // red.200
        'tv-base-color-error-9': '#fee2e2', // red.100
        'tv-base-color-error-10': '#fef2f2', // red.50
        'tv-base-color-error-11': '#450a0a', // red.950

        // Warning 颜色使用 amber 暗色系
        'tv-base-color-warn-1': '#78350f', // amber.900
        'tv-base-color-warn-2': '#92400e', // amber.800
        'tv-base-color-warn-3': '#b45309', // amber.700
        'tv-base-color-warn-4': '#d97706', // amber.600
        'tv-base-color-warn-5': '#f59e0b', // amber.500
        'tv-base-color-warn-6': '#fbbf24', // amber.400
        'tv-base-color-warn-7': '#fcd34d', // amber.300
        'tv-base-color-warn-8': '#fde68a', // amber.200
        'tv-base-color-warn-9': '#fef3c7', // amber.100
        'tv-base-color-warn-10': '#fffbeb', // amber.50
        'tv-base-color-warn-11': '#451a03', // amber.950

        // Info 颜色使用 sky 暗色系
        'tv-base-color-info-1': '#0c4a6e', // sky.900
        'tv-base-color-info-2': '#075985', // sky.800
        'tv-base-color-info-3': '#0369a1', // sky.700
        'tv-base-color-info-4': '#0284c7', // sky.600
        'tv-base-color-info-5': '#0ea5e9', // sky.500
        'tv-base-color-info-6': '#38bdf8', // sky.400
        'tv-base-color-info-7': '#7dd3fc', // sky.300
        'tv-base-color-info-8': '#bae6fd', // sky.200
        'tv-base-color-info-9': '#e0f2fe', // sky.100
        'tv-base-color-info-10': '#f0f9ff', // sky.50
        'tv-base-color-info-11': '#082f49', // sky.950

        // 组件相关颜色变量保持 var 引用
        'tv-color-success-text': 'var(--tv-base-color-success-6)',
        'tv-color-success-text-primary': 'var(--tv-base-color-common-11)',
        'tv-color-success-text-white': 'var(--tv-base-color-common-1)',
        'tv-color-success-bg': 'var(--tv-base-color-success-6)',
        'tv-color-success-bg-light': 'var(--tv-base-color-success-2)',
        'tv-color-success-bg-white': 'var(--tv-base-color-common-1)',
        'tv-color-success-border': 'var(--tv-base-color-success-6)',
        'tv-color-success-border-light': 'var(--tv-base-color-success-2)',
        'tv-color-success-icon': 'var(--tv-base-color-success-6)',

        'tv-color-error-text': 'var(--tv-base-color-error-6)',
        'tv-color-error-text-primary': 'var(--tv-base-color-common-11)',
        'tv-color-error-text-white': 'var(--tv-base-color-common-1)',
        'tv-color-error-bg': 'var(--tv-base-color-error-6)',
        'tv-color-error-bg-light': 'var(--tv-base-color-error-2)',
        'tv-color-error-bg-white': 'var(--tv-base-color-common-1)',
        'tv-color-error-border': 'var(--tv-base-color-error-6)',
        'tv-color-error-border-light': 'var(--tv-base-color-error-2)',
        'tv-color-error-icon': 'var(--tv-base-color-error-6)',

        'tv-color-warn-text': 'var(--tv-base-color-warn-6)',
        'tv-color-warn-text-primary': 'var(--tv-base-color-common-11)',
        'tv-color-warn-text-white': 'var(--tv-base-color-common-1)',
        'tv-color-warn-bg': 'var(--tv-base-color-warn-6)',
        'tv-color-warn-bg-light': 'var(--tv-base-color-warn-2)',
        'tv-color-warn-bg-white': 'var(--tv-base-color-common-1)',
        'tv-color-warn-border': 'var(--tv-base-color-warn-6)',
        'tv-color-warn-border-light': 'var(--tv-base-color-warn-2)',
        'tv-color-warn-icon': 'var(--tv-base-color-warn-6)',

        'tv-color-info-text': 'var(--tv-base-color-info-6)',
        'tv-color-info-text-primary': 'var(--tv-base-color-common-11)',
        'tv-color-info-text-white': 'var(--tv-base-color-common-1)',
        'tv-color-info-bg': 'var(--tv-base-color-info-6)',
        'tv-color-info-bg-light': 'var(--tv-base-color-info-2)',
        'tv-color-info-bg-white': 'var(--tv-base-color-common-1)',
        'tv-color-info-border': 'var(--tv-base-color-info-6)',
        'tv-color-info-border-light': 'var(--tv-base-color-info-2)',
        'tv-color-info-icon': 'var(--tv-base-color-info-6)',

        // 交互相关颜色
        'tv-color-act-primary-text': 'var(--tv-base-color-brand)',
        'tv-color-act-primary-text-hover': 'var(--tv-base-color-brand-3)',
        'tv-color-act-primary-text-active': 'var(--tv-base-color-brand-2)',
        'tv-color-act-primary-text-inverse-tint': 'var(--tv-base-color-common-1)',
        'tv-color-act-primary-text-inverse-tint-hover': 'var(--tv-base-color-common-1)',
        'tv-color-act-primary-text-inverse-tint-active': 'var(--tv-base-color-common-1)',

        'tv-color-act-primary-bg': 'var(--tv-base-color-brand)',
        'tv-color-act-primary-bg-hover': 'var(--tv-base-color-brand-3)',
        'tv-color-act-primary-bg-active': 'var(--tv-base-color-brand-2)',

        'tv-color-act-primary-bg-white': 'var(--tv-base-color-common-1)',
        'tv-color-act-primary-bg-white-hover': 'var(--tv-base-color-common-2)',
        'tv-color-act-primary-bg-white-active': 'var(--tv-base-color-common-3)',

        'tv-color-act-primary-border': 'var(--tv-base-color-brand)',
        'tv-color-act-primary-border-hover': 'var(--tv-base-color-brand-3)',
        'tv-color-act-primary-border-active': 'var(--tv-base-color-brand-2)',

        'tv-color-act-primary-border-light': 'var(--tv-base-color-common-4)',
        'tv-color-act-primary-border-light-hover': 'var(--tv-base-color-common-5)',
        'tv-color-act-primary-border-light-active': 'var(--tv-base-color-common-6)',
    }
};

export { DarkTheme };