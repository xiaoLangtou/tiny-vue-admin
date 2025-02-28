# Data Table 数据表格

一个集成了表格工具栏的高级表格组件，基于 Ant Design Vue 的 Table 组件封装，提供了更便捷的使用方式。

## 功能特点

- 集成了表格工具栏，提供新增、刷新、全屏、列设置、导入、导出等常用功能
- 保留了 Ant Design Vue Table 组件的所有功能和 API
- 支持自定义工具栏按钮
- 简化了表格相关事件的处理
- 支持行选择功能的简化配置
- 响应式设计，适配各种屏幕尺寸

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
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataSource | 数据数组 | `any[]` | `[]` |
| columns | 表格列的配置描述 | `any[]` | `[]` |
| pagination | 分页器配置，设为 false 时不展示分页 | `false \| TablePaginationConfig` | `{ ... }` |
| loading | 页面是否加载中 | `boolean` | `false` |
| rowKey | 表格行 key 的取值 | `string \| ((record: any) => string)` | `'id'` |
| rowSelection | 行选择配置 | `TableProps['rowSelection']` | - |

此外，该组件支持 Ant Design Vue Table 组件的所有属性。

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| add | 点击新增按钮时触发 | - |
| refresh | 点击刷新按钮时触发 | - |
| fullscreen | 点击全屏按钮时触发 | - |
| columnSetting | 点击列设置按钮时触发 | - |
| import | 点击导入按钮时触发 | - |
| export | 点击导出按钮时触发 | - |
| change | 分页、排序、筛选变化时触发 | `(pagination, filters, sorter)` |
| update:selectedRowKeys | 选中项发生变化时触发 | `selectedRowKeys: any[]` |

此外，该组件支持 Ant Design Vue Table 组件的所有事件。

### Slots

| 插槽名 | 说明 |
| --- | --- |
| toolbar-buttons | 自定义工具栏按钮 |

此外，该组件支持 Ant Design Vue Table 组件的所有插槽。

## 注意事项

1. 组件内部已经集成了表格工具栏，不需要再单独引入 TableToolbar 组件
2. 组件会自动处理工具栏按钮的点击事件，只需要在父组件中监听相应的事件即可
3. 行选择功能支持双向绑定，可以通过 `v-model:selectedRowKeys` 来绑定选中的行
4. 组件保留了 Ant Design Vue Table 组件的所有功能和 API，可以直接使用