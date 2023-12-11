export type Lambda<A extends any[] = any[], R = any> = (...args: A) => R;
export type Args = [...args: unknown[]];
