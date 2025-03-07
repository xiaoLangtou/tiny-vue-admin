<template>
    <custom-modal v-model:open="open" modal-title="列设置">
        <template #footer>
            <a-button @click="handleReset">重置</a-button>
            <a-button @click="handleCancel">取消</a-button>
            <a-button type="primary" @click="handleConfirm">确定</a-button>
        </template>

        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="base" tab="列设置">
                <a-alert message="可以调整列的显示、隐藏和固定状态" type="info" show-icon class="mb-4" />

                <!-- 列列表 -->
                <div class="column-setting">
                    <div v-for="(item, index) in columnList" :key="item.key" class="column-item">
                        <div class="left-section">
                            <span>{{ item.title }}</span>
                        </div>
                        <div class="right-section flex items-center justify-center gap-4">
                            <a-tooltip :title="item.visible ? '显示' : '隐藏'">
                                <span>
                                    <component
                                        :is="item.visible ? EyeIcon : EyeOffIcon"
                                        class="w-4 h-4 cursor-pointer"
                                        @click="toggleVisibility(index)"
                                    />
                                </span>
                            </a-tooltip>

                            <a-tooltip :title="getFixedTooltip(item)">
                                <span>
                                    <component
                                        :is="getFixedIcon(item)"
                                        class="w-4 h-4 cursor-pointer"
                                        @click="toggleFixed(index)"
                                    />
                                </span>
                            </a-tooltip>
                        </div>
                    </div>
                </div>
            </a-tab-pane>

            <a-tab-pane key="other" tab="其他设置" force-render>
                <a-alert message="可以调整表格的其他显示效果" type="info" show-icon class="mb-4" />

                <div class="flex flex-col gap-4">
                    <div class="other-setting flex items-center gap-3">
                        <span class="setting-label">高度自适应</span>
                        <a-switch
                            :checked="settingConfig.heightFull"
                            :checked-value="1"
                            :un-checked-value="2"
                            @update:checked="(value) => settingConfig.heightFull = value"
                        />
                    </div>
                    <div class="other-setting flex items-center gap-3">
                        <span class="setting-label">显示边框</span>
                        <a-switch
                            :checked="settingConfig.showBorder"
                            :checked-value="1"
                            :un-checked-value="2"
                            @update:checked="(value) => settingConfig.showBorder = value"
                        />
                    </div>
                </div>
            </a-tab-pane>
        </a-tabs>
    </custom-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next';

import { Pin, AlignStartVertical, AlignEndVertical } from 'lucide-vue-next';

const props = defineProps({
    columns: {
        type: Array as PropType<ColumnItem[]>,
        default: () => [],
    },
    visible: {
        type: Boolean,
        default: false,
    },
    defaultColumns: {
        type: Array as PropType<any[]>,
        default: () => [],
    },
    heightFull: {
        type: Number as PropType<1 | 2>,
        default: 1,
    },
    showBorder: {
        type: Number as PropType<1 | 2>,
        default: 2,
    },
});

const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void;
    (e: 'columnsChange', columns: ColumnItem[], heightFull: 1 | 2, showBorder: 1 | 2): void;
}>();



interface ColumnItem {
    title: string;
    key: string;
    visible: boolean;
    required?: boolean;
    fixed?: 'left' | 'right';
}

interface IPersonalizedSetting {
    columns: ColumnItem[];
    heightFull: 1 | 2;
    showBorder: 1 | 2;
}

const open = computed({
    get: () => props.visible,
    set: (value) => emit('update:visible', value),
});

const activeKey = ref('base');
const columnList = ref<ColumnItem[]>([]);
const settingConfig = reactive<IPersonalizedSetting>({
    columns: [],
    heightFull: props.heightFull,
    showBorder: props.showBorder,
});

// 固定列图标
const fixedIcons = {
    left: AlignStartVertical,
    right: AlignEndVertical,
    default: Pin,
};

// 初始化列列表
const initColumnList = () => {
    console.log(props.columns)
    columnList.value = props.columns.map((col) => ({
        ...col,
        visible: col.visible ?? true,
    }));
};

// 获取固定列的提示信息
const getFixedTooltip = (item: ColumnItem) => {
    return item.fixed === 'left' ? '固定在左侧' : item.fixed === 'right' ? '固定在右侧' : '不固定';
};

// 获取固定列的图标
const getFixedIcon = (item: ColumnItem) => fixedIcons[item.fixed ?? 'default'];

// 切换列的显示/隐藏
const toggleVisibility = (index: number) => {
    columnList.value[index].visible = !columnList.value[index].visible;
    columnList.value = [...columnList.value]; // 触发响应式
};

// 切换列的固定状态
const toggleFixed = (index: number) => {
    const fixedStates: (ColumnItem['fixed'] | undefined)[] = ['left', 'right', undefined];
    const currentIndex = fixedStates.indexOf(columnList.value[index].fixed);
    columnList.value[index].fixed = fixedStates[(currentIndex + 1) % fixedStates.length];
    columnList.value = [...columnList.value]; // 触发响应式
};

// 重置列配置
const handleReset = () => {
    columnList.value = props.defaultColumns.map((col) => ({
        ...col,
        visible: col.visible ?? true,
    }));
    settingConfig.heightFull = props.heightFull;
    settingConfig.showBorder = props.showBorder;
};

// 取消配置
const handleCancel = () => {
    open.value = false;
};

// 确认配置并触发事件
const handleConfirm = () => {
    open.value = false;
    emit('columnsChange', columnList.value, settingConfig.heightFull, settingConfig.showBorder);
};

// 监听 `visible` 变化，初始化数据
watch(
    () => props.visible,
    (newVal) => {
        if (newVal) initColumnList();
    },
);
</script>

<style lang="scss" scoped>
.column-setting {
    .column-item {
        @apply flex items-center justify-between p-2 bg-bg-container dark:bg-bg-darkContainer rounded mb-2;
    }
}
</style>
