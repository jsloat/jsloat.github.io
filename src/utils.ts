import { useEffect } from "react";

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  });
};

export const isDevMode = () => process.env.NODE_ENV === "development";

export const useKeyListener = (keys: string[], onPress: () => any) => {
  const callback = (e: KeyboardEvent) => keys.includes(e.key) && onPress();
  useEffect(() => {
    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  });
};

export const capitalize = (str: string) =>
  str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();

export const isString = (val: any): val is string =>
  typeof val === "string" || val instanceof String;

// https://stackoverflow.com/questions/47632622/typescript-and-filter-boolean
export const ExcludeFalsy = Boolean as any as <T>(x: T | Falsy) => x is T;
