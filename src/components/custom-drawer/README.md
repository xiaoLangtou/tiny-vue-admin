# Custom Drawer 自定义抽屉

基于 Ant Design Vue 的抽屉组件封装，提供更便捷的使用方式和更多实用功能。

## 基础用法

```vue
<template>
    <custom-drawer title="基础抽屉" :open="open" @close="handleClose" @confirm="handleConfirm">
        <p>抽屉内容...</p>
    </custom-drawer>
</template>

<script setup lang="ts">
const open = ref(false);

const handleClose = () => {
    open.value = false;
};

const handleConfirm = () => {
    // 处理确认逻辑
    open.value = false;
};
</script>
```

## 自定义操作按钮

```vue
<template>
    <custom-drawer title="自定义按钮" :open="open">
        <template #extra>
            <a-space>
                <a-button @click="handleClose">关闭</a-button>
                <a-button type="primary" @click="handleSave">保存</a-button>
                <a-button type="primary" danger @click="handleDelete">删除</a-button>
            </a-space>
        </template>
        <p>抽屉内容...</p>
    </custom-drawer>
</template>
```

## API

### Props

| 参数                | 说明                                       | 类型                                    | 默认值            | 版本  |
| ------------------- | ------------------------------------------ | --------------------------------------- | ----------------- | ----- |
| open                | 抽屉是否可见                               | boolean                                 | false             | -     |
| confirmLoading      | 确认按钮加载状态                           | boolean                                 | false             | -     |
| showDefaultActions  | 是否显示默认的底部按钮                     | boolean                                 | true              | -     |
| width               | 抽屉宽度                                   | number \| string                        | 500               | -     |
| placement           | 抽屉方向                                   | 'top' \| 'right' \| 'bottom' \| 'left'  | 'right'           | -     |
| autofocus           | 抽屉展开后是否将焦点切换至其 Dom 节点      | boolean                                 | true              | 3.0.0 |
| bodyStyle           | 可用于设置 Drawer 内容部分的样式           | CSSProperties                           | -                 | -     |
| class               | Drawer 容器外层 className 设置             | string                                  | -                 | -     |
| closable            | 是否显示左上角的关闭按钮                   | boolean                                 | true              | -     |
| closeIcon           | 自定义关闭图标                             | VNode \| slot                           | <CloseOutlined /> | 3.0.0 |
| contentWrapperStyle | 可用于设置 Drawer 包裹内容部分的样式       | CSSProperties                           | -                 | 3.0.0 |
| destroyOnClose      | 关闭时销毁 Drawer 里的子元素               | boolean                                 | false             | -     |
| extra               | 抽屉右上角的操作区域                       | VNode \| slot                           | -                 | 3.0.0 |
| footer              | 抽屉的页脚                                 | VNode \| slot                           | -                 | 3.0.0 |
| footerStyle         | 抽屉页脚部件的样式                         | CSSProperties                           | -                 | 3.0.0 |
| forceRender         | 预渲染 Drawer 内元素                       | boolean                                 | false             | 3.0.0 |
| getContainer        | 指定 Drawer 挂载的节点                     | () => HTMLElement \| Selectors          | 'body'            | -     |
| headerStyle         | 用于设置 Drawer 头部的样式                 | CSSProperties                           | -                 | 3.0.0 |
| height              | 高度, 在 placement 为 top 或 bottom 时使用 | string \| number                        | 378               | -     |
| keyboard            | 是否支持键盘 esc 关闭                      | boolean                                 | true              | -     |
| mask                | 是否展示遮罩                               | boolean                                 | true              | -     |
| maskClosable        | 点击蒙层是否允许关闭                       | boolean                                 | true              | -     |
| maskStyle           | 遮罩样式                                   | CSSProperties                           | {}                | -     |
| push                | 用于设置多层 Drawer 的推动行为             | boolean \| {distance: string \| number} | { distance: 180 } | 3.0.0 |
| rootClassName       | 对话框外层容器的类名                       | string                                  | -                 | 4.0   |
| rootStyle           | 可用于设置 Drawer 最外层容器的样式         | CSSProperties                           | -                 | 4.0   |
| size                | 预设抽屉宽度（或高度）                     | 'default' \| 'large'                    | 'default'         | 3.0.0 |
| style               | 设计 Drawer 容器样式                       | CSSProperties                           | -                 | -     |
| title               | 标题                                       | string \| slot                          | -                 | -     |
| zIndex              | 设置 Drawer 的 z-index                     | number                                  | 1000              | -     |

### Events

| 事件名          | 说明                                 | 回调参数                |
| --------------- | ------------------------------------ | ----------------------- |
| close           | 点击遮罩层或右上角叉或取消按钮的回调 | -                       |
| confirm         | 点击确定回调                         | -                       |
| cancel          | 点击取消回调                         | -                       |
| afterOpenChange | 切换抽屉时动画结束后的回调           | (open: boolean) => void |

### Slots

| 插槽名  | 说明                 |
| ------- | -------------------- |
| default | 抽屉内容             |
| extra   | 抽屉右上角的操作按钮 |
| footer  | 抽屉底部内容         |
