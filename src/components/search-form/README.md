# SearchForm 搜索表单组件

一个基于 Ant Design Vue 的高级搜索表单组件，支持字段展开收起、自定义表单项等功能。

## 基础用法

```vue
<template>
  <search-form
    :fields="fields"
    :collapse-limit="3"
    :show-collapse="true"
    @search="handleSearch"
    @reset="handleReset"
  >
    <!-- 可选：自定义表单项插槽 -->
    <template #status="{ field }">
      <a-select v-model:value="formState[field.name]" :placeholder="`请选择${field.label}`">
        <a-select-option value="1">启用</a-select-option>
        <a-select-option value="0">禁用</a-select-option>
      </a-select>
    </template>

    <!-- 可选：自定义操作按钮插槽 -->
    <template #actions>
      <a-button type="primary" html-type="submit">查询</a-button>
      <a-button style="margin: 0 8px" @click="handleReset">重置</a-button>
      <a-button type="primary" @click="handleExport">导出</a-button>
    </template>
  </search-form>
</template>

<script setup lang="ts">
import { useSearchForm } from '@/hooks/useSearchForm';

// 定义搜索字段
const fields = [
  { name: 'name', label: '名称' },
  { name: 'code', label: '编码' },
  { name: 'status', label: '状态' },
  { name: 'createTime', label: '创建时间' },
];

// 使用 useSearchForm hook
const { formRef, formState, loading, searchProps, handleSearch, handleReset } = useSearchForm({
  fields,
  onSearch: async (values) => {
    console.log('搜索值：', values);
    // 执行搜索逻辑
  },
  onReset: () => {
    console.log('表单已重置');
    // 执行重置后的逻辑
  },
});

// 自定义导出方法
const handleExport = () => {
  const values = formRef.value?.getFieldsValue();
  console.log('导出数据，搜索条件：', values);
};
</script>
```

## 组件 Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fields | 搜索字段配置数组 | SearchField[] | [] |
| collapseLimit | 折叠时显示的字段数量 | number | 3 |
| showCollapse | 是否显示展开/收起按钮 | boolean | true |

### SearchField 配置项

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 字段名称 | string | - |
| label | 字段标签 | string | - |
| rules | 校验规则 | Rule[] | - |

## 组件事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| search | 点击搜索按钮时触发 | function(values: object) |
| reset | 点击重置按钮时触发 | function() |

## 组件插槽

| 插槽名称 | 说明 | 作用域参数 |
| --- | --- | --- |
| [field.name] | 自定义表单项内容 | { field: SearchField } |
| actions | 自定义操作按钮区域 | - |

## useSearchForm Hook

### 参数

```typescript
interface UseSearchFormOptions {
  fields: SearchField[];
  onSearch?: (values: any) => void;
  onReset?: () => void;
  collapseLimit?: number;
  showCollapse?: boolean;
}
```

### 返回值

```typescript
interface UseSearchFormReturn {
  formRef: Ref<FormInstance>;
  formState: object;
  loading: Ref<boolean>;
  searchProps: {
    fields: SearchField[];
    collapseLimit: number;
    showCollapse: boolean;
  };
  handleSearch: (values: any) => void;
  handleReset: () => void;
}
```

## 最佳实践

1. 使用 `useSearchForm` Hook 统一管理搜索表单状态和逻辑
2. 合理设置 `collapseLimit`，建议不超过 3 个字段
3. 对于特殊的表单项，使用具名插槽自定义内容
4. 需要额外的操作按钮时，使用 `actions` 插槽扩展

## 注意事项

1. 组件依赖 Ant Design Vue，请确保项目中已安装
2. 自定义表单项时，需要手动绑定 `v-model:value` 到 `formState[field.name]`
3. 表单重置时会清空所有字段值，如需保留某些字段值，请在 `onReset` 回调中处理