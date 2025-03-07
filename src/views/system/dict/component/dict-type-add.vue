<template>
    <custom-drawer
        v-model:open="dialogVisible"
        :width="500"
        get-container="body"
        :title="{ add: '新增', edit: '编辑' }[activeAction] + '字典'"
        @cancel="closeDialog(formRef)"
        @confirm="handleSave(formRef)"
    >
        <a-form ref="formRef" :model="form" :rules="rules" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
            <a-form-item label="业务类型" name="systemFlag">
                <a-select v-model:value="form.systemFlag" placeholder="请选择业务类型">
                    <a-select-option value="SYSTEM">系统类</a-select-option>
                    <a-select-option value="BUSINESS">业务类</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="字典名称" name="dictName">
                <a-input v-model:value="form.dictName" placeholder="请输入字典名称" />
            </a-form-item>
            <a-form-item label="字典标识" name="dictCode">
                <a-input v-model:value="form.dictCode" :disabled="!!form.id" placeholder="请输入字典标识" />
            </a-form-item>
            <a-form-item label="字典描述" name="dictDesc">
                <a-textarea v-model:value="form.dictDesc" placeholder="请输入字典描述" />
            </a-form-item>
        </a-form>
    </custom-drawer>
</template>

<script setup lang="ts">
import { FormInstance } from 'ant-design-vue';
import { IDictType } from '@/service/interface/dict';
import { addDict, updateDict } from '@/service/apis/dict';
import { useMessage } from '@/composables/common/useMessage';

const emits = defineEmits(['close']);

const { message } = useMessage();

const dialogVisible = ref(false);

const formRef = ref<FormInstance>();
const form = reactive<IDictType>({
    systemFlag: 'BUSINESS',
    dictName: '',
    dictCode: '',
    dictDesc: '',
});

const activeAction = ref('add');

const rules = {
    systemFlag: [{ required: true, message: '请选择业务类型' }],
    dictName: [{ required: true, message: '请输入字典名称' }],
    dictCode: [
        { required: true, message: '请输入字典标识' },
        {
            pattern: /^(?![_\W])[\u4e00-\u9fa5a-zA-Z0-9_]+$/,
            message: '字典标识只能由字母、数字和下划线组成',
        },
    ],
};

const openDialog = (type = 'add', dictItem: any = {}) => {
    if (type === 'edit') {
        form.systemFlag = dictItem.systemFlag;
        form.dictName = dictItem.dictName;
        form.dictCode = dictItem.dictCode;
        form.dictDesc = dictItem.dictDesc;
        form.id = dictItem.id;
    }
    activeAction.value = type;
    dialogVisible.value = true;
};

const handleSave = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    try {
        await formEl.validate();
        const saveURL = activeAction.value === 'add' ? addDict : updateDict;
        await saveURL(form);
        emits('close');
        message.success(`${activeAction.value === 'add' ? '新增' : '编辑'}成功`);
        closeDialog(formEl);
    } catch (error) {
        message.error(`请填写必填项:${(error as any).message ? (error as any).message : error}`);
    }
};

const closeDialog = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
    form.id = '';
    dialogVisible.value = false;
};

defineExpose({ openDialog });
</script>

<style lang="scss">
.dialog-footer {
    text-align: right;

    .ant-btn + .ant-btn {
        margin-left: 8px;
    }
}
</style>
