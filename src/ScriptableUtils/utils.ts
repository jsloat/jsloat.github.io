import { useEffect, useState } from "react";
import { findScriptableRoute } from "./routeMetadata";

export const isRootScriptablePath = (routePath: string) =>
  /\/scriptable-utils\/?$/.test(routePath);

const getMarkdownPath = (routePath: string) =>
  findScriptableRoute(routePath)?.markdownPath;

/** Finds the markdown import for the given route path, then fetches and returns
 * the text from the file. */
export const useFetchMarkdown = (routePath: string) => {
  const [markdown, setMarkdown] = useState("");
  useEffect(() => {
    (async () => {
      const markdownPath = getMarkdownPath(routePath);
      if (!markdownPath) {
        setMarkdown("# Invalid URL");
        return;
      }
      const markdown = await fetch(markdownPath);
      const text = await markdown.text();
      setMarkdown(text);
    })();
  });
  return markdown;
};
