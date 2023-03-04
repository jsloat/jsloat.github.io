import { css } from "styled-components/macro";

/**
 * Colors from Tailwind CSS:
 * https://tailwindcss.com/docs/customizing-colors
 */
export const colors = {
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    900: "#1e3a8a",
  },
  emerald: {
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
  },
  pink: {
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
};

//
//
//

export const BASE_FONT_SIZE = "17px";

export const CONTAINER_PADDING = {
  NORMAL: "50px",
  MOBILE: "25px",
};

export const boxShadowPrefix = (value: string) => css`
  -webkit-box-shadow: ${value};
  -moz-box-shadow: ${value};
  box-shadow: ${value};
`;

export const boxShadow = boxShadowPrefix(
  "3px 3px 6px 0px rgb(170 170 170 / 75%)"
);
