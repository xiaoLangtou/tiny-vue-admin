# Data Table 数据表格

一个集成了表格工具栏的高级表格组件，基于 Ant Design Vue 的 Table 组件封装，提供了更便捷的使用方式。

## 功能特点

-   集成了表格工具栏，提供新增、刷新、全屏、列设置、导入、导出等常用功能
-   支持列设置功能，可以自定义显示/隐藏列、设置列固定位置（左侧/右侧/不固定）
-   保留了 Ant Design Vue Table 组件的所有功能和 API
-   支持自定义工具栏按钮
-   简化了表格相关事件的处理
-   支持行选择功能的简化配置
-   响应式设计，适配各种屏幕尺寸
-   支持列配置本地持久化，记住用户的个性化设置
-   支持表格高度和边框样式的个性化配置

## 基础用法

```vue
<template>
    <data-table
        :columns="columns"
        :dataSource="dataSource"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
        @add="handleAdd"
        @refresh="handleRefresh"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TablePaginationConfig } from 'ant-design-vue';
import { DataTable } from '@/components';

// 定义表格列
const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
    },
];

// 表格数据和状态
const loading = ref(false);
const dataSource = ref([]);
const pagination = ref<TablePaginationConfig>({
    total: 0,
    current: 1,
    pageSize: 10,
});

// 处理表格变化事件
const handleTableChange = (pag: TablePaginationConfig) => {
    pagination.value = pag;
    fetchData();
};

// 处理新增按钮点击
const handleAdd = () => {
    console.log('点击了新增按钮');
    // 实现新增逻辑
};

// 处理刷新按钮点击
const handleRefresh = () => {
    console.log('点击了刷新按钮');
    fetchData();
};

// 获取表格数据
const fetchData = () => {
    loading.value = true;
    // 模拟接口请求
    setTimeout(() => {
        dataSource.value = [
            {
                id: 1,
                name: '张三',
                age: 32,
                address: '北京市朝阳区',
            },
            {
                id: 2,
                name: '李四',
                age: 42,
                address: '上海市浦东新区',
            },
        ];
        loading.value = false;
    }, 1000);
};

// 初始加载数据
fetchData();
</script>
```

## 自定义工具栏按钮

```vue
<template>
    <data-table
        :columns="columns"
        :dataSource="dataSource"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
    >
        <template #toolbar-buttons>
            <a-button @click="handleBatchDelete">
                <template #icon>
                    <Trash class="w-4 h-4" />
                </template>
                批量删除
            </a-button>
            <a-button @click="handleExport">
                <template #icon>
                    <FileDown class="w-4 h-4" />
                </template>
                导出Excel
            </a-button>
        </template>
    </data-table>
</template>

<script setup lang="ts">
import { Trash, FileDown } from 'lucide-vue-next';
// 其他代码省略...

const handleBatchDelete = () => {
    console.log('批量删除');
};

const handleExport = () => {
    console.log('导出Excel');
};
</script>
```

## 列设置功能

列设置功能允许用户自定义表格的显示方式，包括：

-   **显示/隐藏列**：用户可以选择哪些列需要显示，哪些列需要隐藏
-   **固定列位置**：用户可以设置列固定在左侧、右侧或不固定
-   **表格样式设置**：用户可以设置表格是否显示边框、高度是否铺满等
-   **配置持久化**：用户的设置会保存到本地存储，下次打开页面时自动应用

### 基本用法

```vue
<template>
    <data-table
        :columns="columns"
        :dataSource="dataSource"
        :loading="loading"
        :pagination="pagination"
        :locale="true"
        localeName="user-table"
        @column-setting="handleColumnSetting"
        @change="handleTableChange"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/components';

// 定义表格列
const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        // 可以设置默认是否可见
        visible: true,
        // 可以设置是否固定列位置：'left'、'right' 或不设置
        fixed: 'left',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        // 默认可见
        visible: true,
    },
    {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
        // 默认可见
        visible: true,
    },
];

// 处理列设置
const handleColumnSetting = () => {
    console.log('打开列设置');
    // 这里可以添加自定义逻辑，但通常不需要，组件会自动处理列设置弹窗
};

// 其他代码省略...
</script>
```

### 列配置本地持久化

启用本地持久化功能，用户的列设置将保存在浏览器的 localStorage 中：

```vue
<template>
    <data-table
        :columns="columns"
        :dataSource="dataSource"
        :locale="true"  <!-- 启用本地存储 -->
        localeName="user-management-table"  <!-- 设置存储的键名前缀，确保唯一性 -->
        @change="handleTableChange"
    />
</template>
```

````

## 行选择功能

```vue
<template>
    <data-table
        :columns="columns"
        :dataSource="dataSource"
        :loading="loading"
        :pagination="pagination"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        @change="handleTableChange"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';
// 其他代码省略...

const selectedRowKeys = ref<string[]>([]);

const onSelectChange = (keys: string[]) => {
    selectedRowKeys.value = keys;
    console.log('选中的行:', keys);
};
</script>
````

## API

### Props

| 参数         | 说明                                | 类型                                  | 默认值    |
| ------------ | ----------------------------------- | ------------------------------------- | --------- |
| dataSource   | 数据数组                            | `any[]`                               | `[]`      |
| columns      | 表格列的配置描述                    | `any[]`                               | `[]`      |
| pagination   | 分页器配置，设为 false 时不展示分页 | `false \| TablePaginationConfig`      | `{ ... }` |
| loading      | 页面是否加载中                      | `boolean`                             | `false`   |
| rowKey       | 表格行 key 的取值                   | `string \| ((record: any) => string)` | `'id'`    |
| rowSelection | 行选择配置                          | `TableProps['rowSelection']`          | -         |
| locale       | 是否启用本地存储列配置              | `boolean`                             | `false`   |
| localeName   | 本地存储的键名前缀                  | `string`                              | `''`      |

此外，该组件支持 Ant Design Vue Table 组件的所有属性。

### Events

| 事件名                 | 说明                       | 回调参数                            |
| ---------------------- | -------------------------- | ----------------------------------- |
| add                    | 点击新增按钮时触发         | -                                   |
| refresh                | 点击刷新按钮时触发         | -                                   |
| fullscreen             | 点击全屏按钮时触发         | -                                   |
| column-setting         | 点击列设置按钮时触发       | -                                   |
| import                 | 点击导入按钮时触发         | -                                   |
| export                 | 点击导出按钮时触发         | -                                   |
| change                 | 分页、排序、筛选变化时触发 | `(pagination, filters, sorter)`     |
| update:selectedRowKeys | 选中项发生变化时触发       | `selectedRowKeys: any[]`            |
| pageChange             | 分页变化时触发             | `{ current: number, size: number }` |
| toggleAdvancedSearch   | 高级搜索显示状态变化时触发 | `visible: boolean`                  |
| pageChange             | 分页变化时触发             | `{ current: number, size: number }` |

此外，该组件支持 Ant Design Vue Table 组件的所有事件。

### Slots

| 插槽名          | 说明             |
| --------------- | ---------------- |
| toolbar-buttons | 自定义工具栏按钮 |

此外，该组件支持 Ant Design Vue Table 组件的所有插槽。

## 注意事项

1. 组件内部已经集成了表格工具栏，不需要再单独引入 TableToolbar 组件
2. 组件会自动处理工具栏按钮的点击事件，只需要在父组件中监听相应的事件即可
3. 行选择功能支持双向绑定，可以通过 `v-model:selectedRowKeys` 来绑定选中的行
4. 列设置功能支持显示/隐藏列、固定列位置，并可以通过 `locale` 和 `localeName` 属性启用本地存储，记住用户的个性化设置
5. 组件保留了 Ant Design Vue Table 组件的所有功能和 API，可以直接使用
6. 列设置中的配置会自动保存到本地存储，下次打开页面时会自动应用上次的设置
7. 列设置弹窗中可以通过点击眼睛图标切换列的显示/隐藏状态，点击固定图标可以循环切换列的固定位置（左侧/右侧/不固定）
8. 在「其他设置」选项卡中，可以配置表格的高度是否铺满和是否显示边框
9. 使用 `key` 属性作为列的唯一标识，确保列设置功能正常工作
10. 当使用本地存储功能时，请确保 `localeName` 在不同表格间是唯一的，避免配置冲突
