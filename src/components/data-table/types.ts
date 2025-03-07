/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-05 14:43:43
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-06 22:25:03
 * @FilePath: src/components/data-table/types.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import type { PropType } from 'vue';
import type { TableColumnType, TablePaginationConfig, TableProps } from 'ant-design-vue';

export interface TableToolbarProps {
    showRefresh?: boolean;
    showColumnSetting?: boolean;
    showImport?: boolean;
    showExport?: boolean;
    showFullscreen?: boolean;
    showSearch?:boolean;
    isFullscreen?: boolean;
    addBtnText?: string;
}

// 方便 Vue 的 `defineProps` 直接使用
export const tableToolbarProps = {
    showRefresh: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    showColumnSetting: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    showImport: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    showExport: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    showFullscreen: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    showSearch: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isFullscreen: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    addBtnText: {
        type: String as PropType<string>,
        default: '新增',
    },
} as const;


// **DataTable 组件 Props**
export interface DataTableProps extends TableProps, TableToolbarProps {
    dataSource?: any[];
    columns?: TableColumnType[];
    pagination?: false | TablePaginationConfig;
    loading?: boolean;
    rowKey?: string | ((record: any) => string);
    rowSelection?: TableProps['rowSelection'];
    localeName?: string;
    isToolbar?: boolean;
}
