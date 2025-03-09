import { FormInstance } from 'ant-design-vue';
import { ref, shallowReactive } from 'vue';

// 定义字段类型，可以是字符串或对象
export type SearchField<T = any> = string | { name: string; label?: string; defaultValue?: T; [key: string]: any };

// 处理 formState 类型推导
export type FormState<T extends readonly SearchField[]> = {
    [K in Extract<T[number], string>]: string; // 处理字符串数组情况，默认值为空字符串
} & {
    [K in Extract<T[number], { name: string }>['name']]: Extract<T[number], { name: K }> extends {
        defaultValue: infer V;
    }
        ? V
        : string; // 处理对象数组情况，取 defaultValue，否则默认空字符串
};

// 定义 Hook 选项
interface UseSearchFormOptions<T extends readonly SearchField[]> {
    fields: T;
    collapseLimit?: number;
    showCollapse?: boolean;
}

// 定义 Hook
export function useSearchForm<T extends readonly SearchField[]>(
    options: UseSearchFormOptions<T>,
    emit: (event: 'search' | 'reset', values?: FormState<T>) => void,
) {
    const { fields, collapseLimit = 3, showCollapse = true } = options;

    const formRef = ref<FormInstance>();
    const formState = shallowReactive<FormState<T>>(
        Object.fromEntries(
            fields.map((field) => {
                if (typeof field === 'string') {
                    return [field, '']; // 字符串字段默认空字符串
                }
                return [field.name, field.defaultValue ?? '']; // 对象字段取 defaultValue 或默认空字符串
            }),
        ) as FormState<T>,
    );

    const loading = ref(false);
    const expand = ref(false);

    const handleSearch = async () => {
        console.log(formState);
        emit('search', { ...formState });
    };

    const handleReset = () => {
        formRef.value?.resetFields();
        Object.keys(formState).forEach((key) => {
            const field = fields.find((f) => (typeof f === 'string' ? f === key : f.name === key));
            formState[key as keyof FormState<T>] = typeof field === 'string' ? '' : field?.defaultValue ?? '';
        });
        emit('reset');
    };

    return {
        formRef,
        formState,
        loading,
        fields,
        collapseLimit,
        showCollapse,
        expand,
        handleSearch,
        handleReset,
    };
}
