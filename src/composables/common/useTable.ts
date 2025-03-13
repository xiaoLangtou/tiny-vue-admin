import type { TableColumnProps, TablePaginationConfig } from 'ant-design-vue';

export type ITableColumnProps = TableColumnProps & { search?: string };

export interface ITableProps {
    columns: ITableColumnProps[];
    pagination?: TablePaginationConfig;
    rowKey?: string;
    isCreateTime?: boolean;
    isControls?: boolean;
    controlsWidth?: number;
    indexWidth?: number;
    showRefresh?: boolean;
    showColumnSetting?: boolean;
    showImport?: boolean;
    showExport?: boolean;
    showFullscreen?: boolean;
    showSearch?: boolean;
    isFullscreen?: boolean;
    showPagination?: boolean;
    addBtnText?: string;
    isToolbar?: boolean;
    controlsCustomRender?: ({ record }: { record: any }) => any | null;
}

export const useTableConfig = (config: ITableProps) => {
    const {
        columns,
        pagination: _pagination,
        rowKey,
        isCreateTime = true,
        isControls = true,
        controlsCustomRender = null,
        controlsWidth = 200,
        showRefresh = true,
        showColumnSetting = true,
        showImport = false,
        showExport = false,
        showFullscreen = true,
        showSearch = true,
        isFullscreen = true,
        addBtnText = '新增',
        isToolbar = true,
        indexWidth = 80,
        showPagination = true,
    } = config;

    const pagination = ref({
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total: number) => `共 ${total} 条记录`,
        ..._pagination,
    });

    const toolbarConfig = computed(() => {
        return {
            showRefresh,
            showColumnSetting,
            showImport,
            showExport,
            showFullscreen,
            isFullscreen,
            showSearch,
            addBtnText,
            isToolbar,
            showPagination,
        };
    });

    const searchParams = ref<Record<NonNullable<ITableColumnProps['search']>, string>>({});

    const tableColumns = computed(() => {
        const cols = [...columns];

        if (!cols.some((c) => c.dataIndex === 'index')) {
            cols.unshift({
                title: '序号',
                key: 'index',
                dataIndex: 'index',
                width: indexWidth,
                align: 'center',
                customRender: ({ index }: { index: number }) => {
                    return index + 1;
                },
            });
        }

        if (isCreateTime && !cols.some((c) => c.dataIndex === 'createTime')) {
            cols.push({
                title: '创建时间',
                key: 'createTime',
                dataIndex: 'createTime',
                width: 200,
            });
        }

        if (isControls && !cols.some((c) => c.dataIndex === 'controls')) {
            const _controls: ITableColumnProps = {
                title: '操作',
                key: 'controls',
                width: controlsWidth,
                align: 'center',
                fixed: 'right',
            };

            if (controlsCustomRender) {
                _controls.customRender = controlsCustomRender;
            }
            cols.push(_controls);
        }

        cols.forEach((col) => {
            col.key = (col.key ?? col.dataIndex) as string;
            if (col.ellipsis === undefined) {
                col.ellipsis = true;
                col.showSorterTooltip = true;
                col.minWidth = 150;
            }
            if (col.search !== undefined && !['index', 'controls'].includes(col.key as string)) {
                searchParams.value[col.search] = '';
            }
        });

        return cols;
    });

    return {
        tableConfig: {
            rowKey,
            // eslint-disable-next-line vue/no-ref-object-reactivity-loss
            columns: tableColumns.value,
        },
        pagination,
        toolbarConfig,
        searchParams,
    };
};
