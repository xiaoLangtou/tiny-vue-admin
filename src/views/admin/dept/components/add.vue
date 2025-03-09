<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-09 11:55:18
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-09 18:52:13
 * @FilePath: src/views/admin/dept/components/add.vue
 * @Description: 部门新增/编辑表单
 -->
<template>
    <custom-drawer
        v-model:open="dialogVisible"
        :title="dialogTitle"
        width="50%"
        :confirm-loading="submitLoading"
        @confirm="handleSave"
        @cancel="closeDialog"
    >
        <a-form ref="formRef" :model="formData" :rules="rules" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="上级部门" name="parentId">
                        <a-tree-select
                            v-model:value="formData.parentId"
                            :tree-data="deptTreeData"
                            placeholder="请选择上级部门"
                            :field-names="{ children: 'children', label: 'deptName', value: 'id' }"
                            allow-clear
                            tree-default-expand-all
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="部门名称" name="deptName">
                        <a-input v-model:value="formData.deptName" allow-clear />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="部门代码" name="deptCode">
                        <a-input v-model:value="formData.deptCode" :disabled="!!formData.id" allow-clear />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="部门全称" name="fullName">
                        <a-input v-model:value="formData.fullName" allow-clear />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="部门类型" name="deptType">
                        <a-select v-model:value="formData.deptType" allow-clear show-search>
                            <a-select-option v-for="(item, index) in deptTypeDict" :key="index" :value="item.dictValue">
                                {{ item.dictLabel }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="显示排序" name="orderNum">
                        <a-input-number v-model:value="formData.orderNum" :min="0" style="width: 100%" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="负责人" name="leader">
                        <a-input v-model:value="formData.leader" allow-clear />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="办公电话" name="phone">
                        <a-input v-model:value="formData.phone" allow-clear />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="联系地址" name="address">
                        <a-input v-model:value="formData.address" allow-clear />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="邮政编码" name="postalCode">
                        <a-input v-model:value="formData.postalCode" allow-clear />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="电子邮箱" name="email">
                        <a-input v-model:value="formData.email" allow-clear />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="备注" name="remark">
                        <a-textarea v-model:value="formData.remark" :rows="6" :auto-size="false" allow-clear />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </custom-drawer>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { getDictDataListByType } from '@/service/apis/dict';
import { IDept } from '@/service/interface/dept';
import { addDept, getDeptConst, getDeptTree, updateDept } from '@/service/apis/dept';
import { IDictData } from '@/service/interface/dict';
import { useAntdForm } from '@/composables';

const emits = defineEmits(['close']);

defineOptions({
    name: 'DeptAdd',
});

const dialogTitle = ref('新增部门');
const dialogVisible = ref(false);
const deptTypeDict = ref<IDictData[]>([]);

const submitLoading = ref(false);

const { resetFields, validate, createCustomRule, formRef, formData, defaultValue } = useAntdForm<IDept>({
    _formData: reactive<IDept>({
        address: '',
        deptCode: '',
        deptName: '',
        deptType: '',
        email: '',
        fullName: '',
        leader: '',
        orderNum: 0,
        parentId: undefined,
        phone: '',
        postalCode: '',
        remark: '',
    }),
});
const rules = {
    deptName: [createCustomRule({ message: '请输入部门名称' })],
    deptCode: [createCustomRule({ message: '请输入部门代码' })],
    orderNum: [createCustomRule({ message: '请输入显示排序', type: 'number', trigger: 'change' })],
    fullName: [createCustomRule({ message: '请输入部门全称' })],
    deptType: [createCustomRule({ message: '请选择部门类型' })],
    email: [createCustomRule({ type: 'email', message: '请输入正确的邮箱地址', required: false })],
    phone: [createCustomRule({ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', required: false })],
    postalCode: [createCustomRule({ pattern: /^[1-9]\d{5}$/, message: '请输入正确的邮政编码', required: false })],
};

const deptTreeData = ref<IDept[]>([]);

const openDialog = async (type = 'add', deptItem: any = {}) => {
    dialogTitle.value = type === 'edit' ? '修改部门' : '新增部门';
    resetFields();
    if (type === 'edit') {
        Object.assign(formData, {
            id: deptItem.id,
            parentId: deptItem.parentId === -1 ? undefined : deptItem.parentId,
            deptName: deptItem.deptName,
            deptCode: deptItem.deptCode,
            fullName: deptItem.fullName,
            deptType: deptItem.deptType,
            orderNum: deptItem.orderNum,
            leader: deptItem.leader,
            phone: deptItem.phone,
            address: deptItem.address,
            postalCode: deptItem.postalCode,
            email: deptItem.email,
            remark: deptItem.remark,
        });

        if (deptItem.parentId !== -1) {
            await getAllDept();
        }
    } else {
        const { data } = await getDeptConst();
        Object.assign(formData, {
            deptCode: data?.deptCode || '',
            orderNum: data?.orderNum || 0,
            parentId: deptItem.parentId || undefined,
        });

        if (deptItem.parentId) {
            await getAllDept();
        }
    }

    await getDeptTypeDict();
    dialogVisible.value = true;
};

const getAllDept = async () => {
    const { data } = await getDeptTree();
    deptTreeData.value = data;
};

const getDeptTypeDict = async () => {
    const { data } = await getDictDataListByType('SYSTEM_DEPT_TYPE');
    deptTypeDict.value = data;
};

const handleSave = async () => {
    try {
        submitLoading.value = true;
        await validate();
        const saveURL = formData.id ? updateDept : addDept;
        await saveURL(formData);
        message.success('保存成功');
        closeDialog();
    } catch (e) {
        console.error(e);
    } finally {
        submitLoading.value = false;
    }
};

const closeDialog = () => {
    Object.assign(formData, defaultValue);
    formData.id = undefined;
    formData.parentId = undefined;
    resetFields();
    dialogVisible.value = false;
    emits('close');
};

defineExpose({
    openDialog,
});
</script>


