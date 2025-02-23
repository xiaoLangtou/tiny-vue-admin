/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-09 14:11:40
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-22 15:20:41
 * @FilePath: src/utils/result-handler.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
// ==================== 定义 Result<T, E> ==================== //
export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

// ==================== 安全执行同步代码 ==================== //
export function safeRun<T, E = Error>(fn: () => T): Result<T, E> {
    try {
        return { ok: true, value: fn() };
    } catch (error) {
        return { ok: false, error: error as E };
    }
}

// ==================== 安全执行异步代码 ==================== //
export async function to<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> {
    try {
        return { ok: true, value: await promise };
    } catch (error) {
        return { ok: false, error: error as E };
    }
}

// ==================== Result 处理类 ==================== //
export class ResultHandler<T, E = Error> {
    constructor(private result: Result<T, E>) {}

    // 处理成功值，并返回新的 ResultHandler
    map<U>(fn: (value: T) => U): ResultHandler<U, E> {
        if (this.result.ok) {
            return new ResultHandler({ ok: true, value: fn(this.result.value) });
        }
        return new ResultHandler(this.result as Result<U, E>);
    }

    // 处理错误值，转换 E -> F
    mapErr<F>(fn: (error: E) => F): ResultHandler<T, F> {
        if (!this.result.ok) {
            return new ResultHandler({ ok: false, error: fn((this.result as { ok: false; error: E }).error) });
        }
        return new ResultHandler(this.result as Result<T, F>);
    }

    // 获取原始 Result
    unwrap(): T {
        if (this.result.ok) return this.result.value;
        throw new Error(`Unwrap failed: ${String((this.result as { ok: false; error: E }).error)}`);
    }

    // 获取 Result 结构
    get(): Result<T, E> {
        return this.result;
    }
}
