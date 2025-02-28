import { FormInstance } from 'ant-design-vue';
import { ref, reactive } from 'vue';

interface SearchField {
    name: string;
    label: string;
    rules?: any[];

    [key: string]: any;
}

interface UseSearchFormOptions {
    fields: SearchField[];
    onSearch?: (values: any) => void;
    onReset?: () => void;
    collapseLimit?: number;
    showCollapse?: boolean;
}

export function useSearchForm(options: UseSearchFormOptions) {
    const {
        fields,
        onSearch,
        onReset,
        collapseLimit = 3,
        showCollapse = true,
    } = options;

    const formRef = ref<FormInstance>();
    const formState = reactive<Record<string, any>>({});
    const loading = ref(false);

    const handleSearch = async (values: any) => {
        if (!onSearch) return;
        try {
            loading.value = true;
            await onSearch(values);
        } finally {
            loading.value = false;
        }
    };

    const handleReset = () => {
        formRef.value?.resetFields();
        onReset?.();
    };

    return {
        formRef,
        formState,
        loading,
        searchProps: {
            fields,
            collapseLimit,
            showCollapse,
        },
        handleSearch,
        handleReset,
    };
}
