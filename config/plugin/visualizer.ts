/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-21 00:08:11
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-21 00:10:58
 * @FilePath: config/plugin/visualizer.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import visualizer from 'rollup-plugin-visualizer';
import { isReportMode } from '../utils';

export default function configVisualizerPlugin() {
    if (isReportMode()) {
        return visualizer({
            filename: './node_modules/.cache/visualizer/stats.html',
            open: true,
            gzipSize: true,
            brotliSize: true,
        });
    }
    return [];
}
