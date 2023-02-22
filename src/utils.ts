import { useEffect } from "react";

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  });
};

export const isDevMode = () => process.env.NODE_ENV === "development";

type UseKeyListenerOpts = {
  key: string;
  onPress: () => any;
  /** If specified, require the given modifier keys to be held down while `key`
   * is pressed to trigger. */
  requireModifiers?: string[];
};
export const useKeyListener = ({
  key,
  onPress,
  requireModifiers,
}: UseKeyListenerOpts) => {
  const callback = (e: KeyboardEvent) => {
    if (e.key !== key) return;
    if (requireModifiers?.length) {
      const areAllPressed = requireModifiers.every(modifierKey =>
        e.getModifierState(modifierKey)
      );
      if (!areAllPressed) return;
    }
    onPress();
  };
  useEffect(() => {
    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  });
};
