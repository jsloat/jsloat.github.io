import { useEffect } from "react";

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  });
};

export const isDevMode = () => process.env.NODE_ENV === "development";

export const useKeyListener = (key: string, onPress: () => any) => {
  const callback = (e: KeyboardEvent) => e.key === key && onPress();
  useEffect(() => {
    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  });
};
