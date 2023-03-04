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
