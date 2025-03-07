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
    // 提取
}
