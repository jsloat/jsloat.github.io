import { css } from "styled-components/macro";

export const containerPadding = css`
  padding: 2em 1.5em;
`;

export const INFO_TABLE_KEYWORDS = <const>["INFO", "WARNING"];

type InfoTableKeyword = typeof INFO_TABLE_KEYWORDS[number];

export const INFO_KEYWORD_CLASSES: Record<InfoTableKeyword, string> = {
  INFO: "info",
  WARNING: "warning",
};

export const CODEBLOCK_PARENT_CLASS = "codeBlockParent";
export const INLINE_CODE_CLASS = "inlineCode";
export const COPY_BUTTON_CLASS = "copyButton";
export const DID_COPY_CLASS = "copied";
