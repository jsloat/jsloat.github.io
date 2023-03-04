import { useEffect } from "react";
import styleCodeBlocks from "./styleCodeBlocks";
import styleTables from "./styleTables";

/**
 * Because the content is written in markdown and then compiled into HTML by a
 * 3rd-party library, this hook makes some customizations to the HTML content
 * once rendered (e.g. adding classes, inserting copy buttons for the code
 * blocks, etc.).
 */
const useCustomizeMarkdownGeneratedHTML = () => {
  useEffect(() => {
    styleCodeBlocks();
    styleTables();
  });
};

export default useCustomizeMarkdownGeneratedHTML;
