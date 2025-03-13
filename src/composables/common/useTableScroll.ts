/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-06 12:56:41
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-13 12:48:06
 * @FilePath: src/composables/common/useTableScroll.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
export function useTableScroll(scrollX: MaybeRef<number> = 1200) {
    const tableWrapperRef = ref();
    const { height: wrapperElHeight } = useElementSize(tableWrapperRef);

    const scrollConfig = computed(() => {
        return {
            y: wrapperElHeight.value,
            x: toValue(scrollX),
        };
    });

    return {
        tableWrapperRef,
        scrollConfig,
    };
}
