/// <reference types="vite/client" />

export {};

declare module '*.vue' {
    import { DefineComponent } from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module 'vue/types/vue' {
    interface Vue {
        $echarts: any;
    }
}



declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $t: (key: string) => string;
        $tm: (key: string) => [] | { [p: string]: any };
    }
}
