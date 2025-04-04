# Table Toolbar 表格工具栏

一个功能丰富的表格工具栏组件，提供了常用的表格操作按钮和功能。

## 功能特点

- 内置新增、刷新、全屏、列设置、导入、导出等常用功能按钮
- 集成快捷搜索和高级搜索切换功能
- 支持自定义按钮插槽
- 响应式布局，自适应移动端
- 支持暗黑模式

## 基础用法

```vue
<template>
    <table-toolbar>
        <!-- 自定义按钮 -->
        <template #buttons>
            <a-button>自定义按钮</a-button>
        </template>
    </table-toolbar>
</template>

<script setup lang="ts">
import { TableToolbar } from '@/components';
</script>
```

## API

### Props

| 属性名            | 说明               | 类型    | 默认值 |
| ----------------- | ------------------ | ------- | ------ |
| showRefresh       | 是否显示刷新按钮   | boolean | true   |
| showColumnSetting | 是否显示列设置按钮 | boolean | true   |
| showImport        | 是否显示导入按钮   | boolean | false  |
| showExport        | 是否显示导出按钮   | boolean | false  |
| showFullscreen    | 是否显示全屏按钮   | boolean | false  |

### Events

| 事件名                 | 说明                 | 回调参数         |
| ---------------------- | -------------------- | ---------------- |
| add                    | 点击新增按钮时触发   | -                |
| refresh                | 点击刷新按钮时触发   | -                |
| fullscreen             | 点击全屏按钮时触发   | -                |
| column-setting         | 点击列设置按钮时触发 | -                |
| import                 | 点击导入按钮时触发   | -                |
| export                 | 点击导出按钮时触发   | -                |
| quick-search           | 快捷搜索时触发       | value: string    |
| toggle-advanced-search | 切换高级搜索时触发   | visible: boolean |

### Slots

| 插槽名  | 说明                                   |
| ------- | -------------------------------------- |
| buttons | 自定义按钮区域，显示在新增按钮后面     |
| toolbar | 自定义工具栏区域，显示在右侧功能区最后 |

## 代码示例

### 基础用法

```vue
<template>
    <table-toolbar @add="handleAdd" @refresh="handleRefresh" />
</template>

<script setup lang="ts">
import { TableToolbar } from '@/components';

const handleAdd = () => {
    // 处理新增逻辑
};

const handleRefresh = () => {
    // 处理刷新逻辑
};
</script>
```

### 使用搜索功能

```vue
<template>
    <table-toolbar @quick-search="handleQuickSearch" @toggle-advanced-search="handleToggleAdvancedSearch" />
</template>

<script setup lang="ts">
import { TableToolbar } from '@/components';

const handleQuickSearch = (value: string) => {
    // 处理快捷搜索逻辑
    console.log('搜索关键词:', value);
};

const handleToggleAdvancedSearch = (visible: boolean) => {
    // 处理高级搜索显示/隐藏
    console.log('高级搜索显示状态:', visible);
};
</script>
```

### 自定义按钮

```vue
<template>
    <table-toolbar>
        <template #buttons>
            <a-button type="primary" @click="handleCustomAction">
                <template #icon>
                    <UserPlus class="w-4 h-4" />
                </template>
                添加用户
            </a-button>
            <a-button @click="handleBatchDelete">
                <template #icon>
                    <Trash class="w-4 h-4" />
                </template>
                批量删除
            </a-button>
        </template>
    </table-toolbar>
</template>

<script setup lang="ts">
import { TableToolbar } from '@/components';
import { UserPlus, Trash } from 'lucide-vue-next';

const handleCustomAction = () => {
    // 处理自定义按钮点击逻辑
};

const handleBatchDelete = () => {
    // 处理批量删除逻辑
};
</script>
```

### 完整示例

```vue
<template>
    <div class="page-container">
        <!-- 搜索表单 -->
        <search-form v-if="showAdvancedSearch" :fields="searchFields" @search="handleSearch" />

        <!-- 表格工具栏 -->
        <table-toolbar
            @add="handleAdd"
            @refresh="handleRefresh"
            @import="handleImport"
            @export="handleExport"
            @quick-search="handleQuickSearch"
            @toggle-advanced-search="handleToggleAdvancedSearch"
        >
            <template #buttons>
                <a-button :disabled="!selectedRows.length" @click="handleBatchDelete"> 批量删除 </a-button>
            </template>
        </table-toolbar>

        <!-- 数据表格 -->
        <a-table
            v-model:selectedKeys="selectedKeys"
            :columns="columns"
            :data-source="dataSource"
            :loading="loading"
            :pagination="pagination"
            @change="handleTableChange"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TableToolbar, SearchForm } from '@/components';
import type { TablePaginationConfig } from 'ant-design-vue';

// 搜索字段配置
const searchFields = [
    { name: 'keyword', label: '关键词' },
    { name: 'status', label: '状态' },
    { name: 'date', label: '日期' },
];

// 表格数据
const loading = ref(false);
const dataSource = ref([]);
const selectedKeys = ref([]);
const showAdvancedSearch = ref(false);
const pagination = ref<TablePaginationConfig>({
    total: 0,
    current: 1,
    pageSize: 10,
});

// 处理快捷搜索
const handleQuickSearch = (value: string) => {
    // 使用关键词搜索
    console.log('快捷搜索:', value);
    fetchData();
};

// 处理高级搜索显示/隐藏
const handleToggleAdvancedSearch = (visible: boolean) => {
    showAdvancedSearch.value = visible;
};

// 处理高级搜索
const handleSearch = (values: any) => {
    console.log('高级搜索参数:', values);
    // 重置分页并刷新数据
    pagination.value.current = 1;
    fetchData();
};

// 处理新增
const handleAdd = () => {
    // 打开新增表单弹窗
};

// 处理刷新
const handleRefresh = () => {
    fetchData();
};

// 处理导入
const handleImport = () => {
    // 打开导入弹窗
};

// 处理导出
const handleExport = () => {
    // 导出数据
};

// 处理批量删除
const handleBatchDelete = () => {
    // 删除选中数据
};

// 处理表格变化
const handleTableChange = (pag: TablePaginationConfig) => {
    pagination.value = pag;
    fetchData();
};

// 获取表格数据
const fetchData = () => {
    loading.value = true;
    // 调用接口获取数据
    setTimeout(() => {
        loading.value = false;
    }, 1000);
};
</script>
```

## 注意事项

1. 组件内置的按钮都提供了相应的事件，需要在父组件中处理这些事件的具体逻辑
2. 自定义按钮建议保持与内置按钮相同的样式风格
3. 在移动端下，工具栏会自动调整为垂直布局
4. 组件支持暗黑模式，会自动跟随系统主题
5. 快捷搜索和高级搜索可以同时使用，建议根据业务需求选择合适的搜索方式
6. 高级搜索表单建议使用 SearchForm 组件，可以更好地配合工具栏使用
