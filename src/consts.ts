import { css } from "styled-components/macro";

/**
 * Colors from Tailwind CSS:
 * https://tailwindcss.com/docs/customizing-colors
 */

export const SLATE_300 = "#cbd5e1";
export const SLATE_400 = "#94a3b8";
export const SLATE_600 = "#475569";
export const SLATE_900 = "#0f172a";

//
//
//

export const BASE_FONT_SIZE = "17px";

export const CONTAINER_PADDING = {
  NORMAL: "50px",
  MOBILE: "25px",
};

export const boxShadow = css`
  -webkit-box-shadow: 3px 3px 6px 0px rgb(170 170 170 / 75%);
  -moz-box-shadow: 3px 3px 6px 0px rgb(170 170 170 / 75%);
  box-shadow: 3px 3px 6px 0px rgb(170 170 170 / 75%);
`;
