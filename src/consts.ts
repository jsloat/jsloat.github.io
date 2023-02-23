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
    600: "#475569",
    900: "#0f172a",
  },
  blue: {
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    900: "#1e3a8a",
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

export const boxShadowPrefix = (value: string) => css`::after
  -webkit-box-shadow: ${value};
  -moz-box-shadow: ${value};
  box-shadow: ${value};
`;

export const boxShadow = boxShadowPrefix(
  "3px 3px 6px 0px rgb(170 170 170 / 75%)"
);
