/// <reference types="@rsbuild/core/types" />

export {};

declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<object, object, any>;
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
