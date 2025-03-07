# DataTable 数据表格组件

## 组件说明

DataTable 是一个基于 ant-design-vue 的 Table 组件封装的高级表格组件，集成了工具栏、列设置、全屏等功能。

## 组件属性

### 基础属性（继承自 a-table）

| 属性名       | 类型                                | 默认值 | 说明              |
| ------------ | ----------------------------------- | ------ | ----------------- |
| dataSource   | any[]                               | []     | 数据数组          |
| columns      | any[]                               | []     | 表格列的配置描述  |
| loading      | boolean                             | false  | 页面是否加载中    |
| rowKey       | string \| ((record: any) => string) | 'id'   | 表格行 key 的取值 |
| rowSelection | TableProps['rowSelection']          | -      | 列表项是否可选择  |
| pagination   | false \| TablePaginationConfig      | {}     | 分页器配置        |

### 工具栏属性（table-toolbar）

| 属性名            | 类型    | 默认值 | 说明               |
| ----------------- | ------- | ------ | ------------------ |
| showRefresh       | boolean | true   | 是否显示刷新按钮   |
| showColumnSetting | boolean | true   | 是否显示列设置按钮 |
| showImport        | boolean | false  | 是否显示导入按钮   |
| showExport        | boolean | false  | 是否显示导出按钮   |
| showFullscreen    | boolean | true   | 是否显示全屏按钮   |
| isFullscreen      | boolean | false  | 是否全屏显示       |
| addBtnText        | string  | '新增' | 新增按钮文本       |

### 列设置属性（column-setting）

| 属性名         | 类型         | 默认值 | 说明                           |
| -------------- | ------------ | ------ | ------------------------------ |
| columns        | ColumnItem[] | []     | 列配置项                       |
| visible        | boolean      | false  | 是否显示列设置弹窗             |
| defaultColumns | ColumnItem[] | []     | 默认列配置                     |
| heightFull     | 1 \| 2       | 2      | 表格是否铺满高度（1:是，2:否） |
| showBorder     | 1 \| 2       | 2      | 是否显示边框（1:是，2:否）     |

### 扩展属性

| 属性名     | 类型    | 默认值 | 说明                   |
| ---------- | ------- | ------ | ---------------------- |
| locale     | boolean | false  | 是否启用本地存储列配置 |
| localeName | string  | ''     | 本地存储的键名前缀     |
| isToolbar  | boolean | true   | 是否显示工具栏         |

## 事件

| 事件名                 | 说明                       | 回调参数                                                       |
| ---------------------- | -------------------------- | -------------------------------------------------------------- |
| add                    | 点击新增按钮时触发         | -                                                              |
| refresh                | 点击刷新按钮时触发         | -                                                              |
| import                 | 点击导入按钮时触发         | -                                                              |
| export                 | 点击导出按钮时触发         | -                                                              |
| change                 | 分页、排序、筛选变化时触发 | (pagination: TablePaginationConfig, filters: any, sorter: any) |
| pageChange             | 页码或每页条数变化时触发   | { current: number, size: number }                              |
| update:selectedRowKeys | 选中项发生变化时触发       | selectedRowKeys: any[]                                         |
| toggleAdvancedSearch   | 切换高级搜索显示状态时触发 | value: boolean                                                 |

## 插槽

| 插槽名               | 说明                     | 作用域参数                             |
| -------------------- | ------------------------ | -------------------------------------- |
| toolbar-buttons      | 工具栏左侧自定义按钮     | -                                      |
| title                | 表格标题                 | { currentPageData: any[] }             |
| footer               | 表格页脚                 | { currentPageData: any[] }             |
| bodyCell             | 自定义单元格内容         | { text, record, index, column, value } |
| customFilterDropdown | 自定义筛选菜单           | { customFilterDropdown }               |
| customFilterIcon     | 自定义筛选图标           | { filtered, column }                   |
| emptyText            | 自定义空数据时的显示内容 | -                                      |
| expandIcon           | 自定义展开图标           | { expanded, onExpand, record }         |
| expandedRowRender    | 展开行的内容             | { record, index, indent, expanded }    |
| expandColumnTitle    | 展开列的列头             | -                                      |
| headerCell           | 自定义表头单元格         | { title, column }                      |
| summary              | 总结栏                   | -                                      |
