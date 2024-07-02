declare module "*.svg" {
  const path: string;
  export default path;
}

declare namespace NodeJS {
  export type ProcessEnv = {
    PUBLIC_URL: string;
    NODE_ENV: string;
  };
}

declare type Identity<T> = (initValue: T) => T;

declare type Entry<T extends AnyObj> = [key: keyof T, val: T[keyof T]];

declare module "*.md" {
  const value: string;
  export default value;
}

declare type Falsy = false | null | undefined | "" | void | 0;

declare type SortOrder = "ASC" | "DESC";

declare type MapFn<Input, Output> = (input: Input) => Output;

declare type Predicate<T> = MapFn<T, boolean>;

declare type SortFn<T> = (a: T, b: T) => number;

declare type ObjComparison<T, R = boolean> = (a: T, b: T) => R;

/** Convert some keys to be required, leaving others untouched. Can also include
 * keys to exclude from resulting type */
declare type MakeSomeReqd<
  Source extends Record<string, any>,
  // Keys to convert to required
  MakeReqKeys extends keyof Source = never,
  ExcludeKeys extends keyof Source = never
> = Omit<Source, ExcludeKeys | MakeReqKeys> &
  Pick<Required<Source>, MakeReqKeys>;
