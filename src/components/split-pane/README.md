# Split Pane 组件

一个灵活的分割面板组件，支持可折叠、响应式布局和移动端适配。

## 功能特点

-   支持水平和垂直分割模式
-   可调节分割面板大小
-   支持面板折叠/展开
-   自适应响应式布局
-   移动端友好的交互体验
-   支持自定义样式

## 属性说明

| 属性名        | 类型          | 默认值 | 说明                                         |
| ------------- | ------------- | ------ | -------------------------------------------- |
| size          | string/number | '20%'  | 侧边栏大小，支持百分比或像素值               |
| minSize       | number        | 200    | 侧边栏最小尺寸（像素）                       |
| maxSize       | number        | 800    | 侧边栏最大尺寸（像素）                       |
| customStyle   | object        | -      | 自定义样式对象                               |
| bodyStyle     | object        | -      | 内容区域自定义样式                           |
| allowCollapse | boolean       | true   | 是否允许折叠                                 |
| collapse      | boolean       | false  | 是否折叠（可使用 v-model:collapse 双向绑定） |
| vertical      | boolean       | false  | 是否垂直分割                                 |
| reverse       | boolean       | false  | 是否反转布局                                 |
| responsive    | boolean       | true   | 是否启用响应式布局                           |

## 事件

| 事件名          | 参数             | 说明               |
| --------------- | ---------------- | ------------------ |
| update:collapse | (value: boolean) | 折叠状态改变时触发 |

## 插槽

| 插槽名 | 说明                   |
| ------ | ---------------------- |
| left   | 左侧（或顶部）面板内容 |
| main   | 主要内容区域           |

## 基础用法

```vue
<template>
    <SplitPane v-model:collapse="isCollapsed" size="300px">
        <!-- 左侧面板 -->
        <template #left>
            <div class="left-panel">左侧面板内容</div>
        </template>

        <!-- 主内容区域 -->
        <template #main>
            <div class="main-content">主要内容区域</div>
        </template>
    </SplitPane>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isCollapsed = ref(false);
</script>
```

## 垂直分割模式

```vue
<template>
    <SplitPane vertical size="200px">
        <template #left>
            <div>顶部面板</div>
        </template>
        <template #main>
            <div>底部内容</div>
        </template>
    </SplitPane>
</template>
```

## 自定义样式

```vue
<template>
    <SplitPane size="25%" :customStyle="{ border: '1px solid #eee' }" :bodyStyle="{ padding: '20px' }">
        <template #left>
            <div>自定义样式的侧边栏</div>
        </template>
        <template #main>
            <div>自定义样式的主内容区域</div>
        </template>
    </SplitPane>
</template>
```

## 响应式布局说明

组件默认启用响应式布局（responsive=true），在移动端（屏幕宽度 ≤ 768px）时：

-   侧边栏会自动切换为覆盖模式
-   折叠按钮位置会自动调整为更适合触摸操作的位置
-   可以通过点击折叠按钮来显示/隐藏侧边栏

如需禁用响应式布局，可以设置 `:responsive="false"`。

## 注意事项

1. 组件默认使用 flex 布局，请确保父容器具有明确的高度。
2. 在使用百分比尺寸时，同样需要确保父容器具有明确的尺寸。
3. 移动端模式下，建议将 size 设置为具体像素值而非百分比，以获得更好的用户体验。
