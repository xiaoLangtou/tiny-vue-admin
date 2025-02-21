/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-21 00:03:54
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-21 00:15:12
 * @FilePath: config/plugin/imagemin.ts
 * @Description: 图片压缩插件
 */
// 导入 vite-plugin-imagemin 插件
import viteImagemin from 'vite-plugin-imagemin';

//  vite-plugin-imagemin 的函数
export default function configImageminPlugin() {
    return viteImagemin({
        // GIF 图片优化配置
        gifsicle: {
            optimizationLevel: 7, // 设置优化级别，最大值 7，优化效果更好但处理较慢
            interlaced: false, // 关闭隔行扫描
        },
        // PNG 图片优化配置
        optipng: {
            optimizationLevel: 7, // 最高级别的优化，尽可能压缩 PNG
        },
        // JPEG 图片优化配置
        mozjpeg: {
            quality: 20, // 设置 JPEG 质量为 20（范围 0-100，数值越低质量越差但体积更小）
        },
        // 另一种 PNG 图片优化方式（与 optipng 类似，但更高效）
        pngquant: {
            quality: [0.8, 0.9], // 设置 PNG 质量范围（0-1），保证图片质量在 80%-90% 之间
            speed: 4, // 压缩速度（1-11），数值越大速度越快但压缩率较低
        },
        // SVG 图片优化配置
        svgo: {
            plugins: [
                {
                    name: 'removeViewBox', // 移除 viewBox 属性，可能会影响缩放
                },
                {
                    name: 'removeEmptyAttrs', // 移除空属性（但此处未启用）
                    active: false, // 该插件未启用
                },
            ],
        },
    });
}
