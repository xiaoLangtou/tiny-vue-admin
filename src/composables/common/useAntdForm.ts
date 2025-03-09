/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-07 09:08:59
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-09 18:51:14
 * @FilePath: src/composables/common/useAntdForm.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { FormInstance } from 'ant-design-vue';
import { useFormRules } from '@/composables';
import { Reactive } from 'vue';

export function useAntdForm<T>({ _formData }: { _formData: Reactive<T> }) {
    const formRef = ref<FormInstance | null>(null);
    const defaultValue = JSON.parse(JSON.stringify(_formData));
    const { createCustomRule, createRequiredRule, combineRules } = useFormRules();
    const validate = async () => {
        await formRef.value?.validate();
    };

    const resetFields = () => {
        formRef.value?.resetFields(); // 重置表单
    };

    return {
        createCustomRule,
        createRequiredRule,
        combineRules,
        formRef,
        formData: _formData, // 返回响应式的 formData
        defaultValue,
        validate,
        resetFields,
    };
};

