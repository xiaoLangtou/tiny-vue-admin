import { VNode } from 'vue';

declare global {
    namespace JSX {
        type Element = VNode;
        interface ElementClass {
            $props: {};
        }
        interface IntrinsicElements {
            [elem: string]: any;
        }
    }
}
