export type Expand<T> = T extends object
  ? T extends (...args: infer A) => infer R
    ? (...args: Expand<A>) => Expand<R>
    : T extends infer O
    ? { [K in keyof O]: Expand<O[K]> }
    : never
  : T;

export type Prefix<S, T> = `${S & string}${keyof T & string}`;

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
