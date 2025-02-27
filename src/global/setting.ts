export default {
    // 网站标题
    title: 'NEST AVA', // 这是浏览器标签页显示的标题

    // 主题模式，支持 'light' 和 'dark'
    theme: 'light', // 当前使用的主题，'light' 是浅色模式，'dark' 是深色模式

    // 主题主色调
    colorPrimary: '#6366f1', // 设置页面中的主要颜色，通常是按钮、链接等组件的默认颜色

    // 网站Logo路径
    logo: '/logo.svg', // 侧边栏或页面顶部的 logo 图片路径

    // 侧边栏是否折叠
    collapsed: false, // 默认侧边栏是展开的，设置为 true 时侧边栏会收起

    // 控制抽屉模式（一般用于弹出框等）
    drawerVisible: false, // 控制抽屉组件的显示与隐藏

    // 布局模式，支持 'mix', 'side', 'top' 等
    layout: 'mix', // 设定布局方式，'mix' 是顶部 + 侧边栏混合布局

    // 内容区域宽度，支持 'Fluid' 和 'Fixed'
    contentWidth: 'Fluid', // 'Fluid' 表示内容宽度自适应，'Fixed' 为固定宽度

    // 是否固定头部
    fixedHeader: false, // 设置为 true 时，页面的头部会固定在顶部，滚动时不动

    // 是否固定侧边栏
    fixedSider: true, // 设置为 true 时，侧边栏会固定，滚动时不动

    // 是否启用分割菜单
    splitMenus: false, // 设置为 true 时，侧边栏会将菜单项分割为多列

    // 是否显示头部
    header: true, // 设置为 false 时，页面顶部的导航栏将被隐藏

    // 是否显示菜单
    menu: true, // 设置为 false 时，侧边栏菜单会被隐藏

    // 是否启用水印
    watermark: true, // 设置为 true 时，页面会显示水印

    // 是否显示菜单头部
    menuHeader: true, // 设置为 false 时，侧边栏顶部的菜单标题将被隐藏

    // 是否显示页脚
    footer: false, // 设置为 true 时，页面底部会显示页脚内容

    // 是否开启色盲模式
    colorWeak: false, // 设置为 true 时，开启色盲模式，调整配色使之适合色弱用户

    // 是否开启灰度模式
    colorGray: false, // 设置为 true 时，启用灰度模式，所有颜色变成灰色

    // 是否启用多标签页
    multiTab: true, // 设置为 true 时，开启多标签页，允许用户在多个标签之间切换

    // 是否固定多标签页
    multiTabFixed: false, // 设置为 true 时，固定标签页，用户无法关闭

    // 是否启用页面缓存
    keepAlive: true, // 设置为 true 时，启用页面缓存，避免频繁刷新

    // 是否启用手风琴模式，多个菜单项可以展开/收起
    accordionMode: false, // 设置为 true 时，侧边栏的菜单将启用手风琴模式，即一次只展开一个菜单项

    // 左侧菜单是否折叠
    leftCollapsed: true, // 设置为 true 时，左侧的菜单会被折叠，只显示图标

    // 是否启用紧凑算法来压缩布局
    compactAlgorithm: false, // 设置为 true 时，启用紧凑算法，减小组件和元素之间的间距

    // 头部的高度，单位为像素
    headerHeight: 48, // 控制头部的高度，可以根据需要调整

    // 网站的版权信息
    copyright: 'Antdv Pro Team 2023', // 网站底部显示的版权信息

    // 页面切换时的动画效果
    animationName: 'slide-fadein-right', // 定义页面切换时的动画效果名称
};
