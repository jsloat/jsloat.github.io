import { PageRange, TOCEntryWithDumbTags } from "./types";

type ParseFreehandResponse = {
  entries?: TOCEntryWithDumbTags[];
  errorMessage?: string;
};
const parseFreehand = (text: string): ParseFreehandResponse => {
  try {
    const lines = text.split("\n").filter(Boolean);
    return { entries: lines.map(parseLine) };
  } catch (error) {
    return { errorMessage: (error as Error).message };
  }
};
export default parseFreehand;

const parseLine = (line: string): TOCEntryWithDumbTags => {
  const result: Partial<TOCEntryWithDumbTags> = { pageRanges: [], tags: [] };
  let remainder = line.slice(0);

  const isHeader = remainder.startsWith("#");
  if (isHeader) {
    result.isMonthEntry = true;
    remainder = remainder.slice(1);
  }

  const indexOfFirstShorthandOpenTag = remainder
    .split("")
    .findIndex((char) => ["(", "#"].includes(char));
  if (indexOfFirstShorthandOpenTag === -1) {
    // Rest of string is title
    result.text = remainder.trim();
    return result as TOCEntryWithDumbTags;
  }

  result.text = remainder.slice(0, indexOfFirstShorthandOpenTag).trim();
  remainder = remainder.slice(indexOfFirstShorthandOpenTag);

  return { ...result, ...parsePagesAndTags(remainder) } as TOCEntryWithDumbTags;
};

type PagesAndTags = Pick<TOCEntryWithDumbTags, "pageRanges" | "tags">;
type PagesAndTagsParserState = {
  parsing: "PAGES" | "TAGS" | null;
  value: string | null;
};
const parsePagesAndTags = (remainder: string) => {
  const result: PagesAndTags = { pageRanges: [], tags: [] };
  let parseState: PagesAndTagsParserState = { parsing: null, value: null };
  for (const char of remainder) {
    const { parsing, value } = parseState;
    switch (parsing) {
      case null: {
        if (char === " ") continue;
        else if (char === "(") parseState = { parsing: "PAGES", value: null };
        else if (char === "#") parseState = { parsing: "TAGS", value: null };
        else throw new Error(`Invalid character: ${char}`);
        break;
      }
      case "PAGES": {
        if (char === ")") {
          result.pageRanges.push(parsePagesStr(value!));
          parseState = { parsing: null, value: null };
        } else {
          parseState.value = [value, char].filter(Boolean).join("");
        }
        break;
      }
      case "TAGS": {
        if (char === "#") {
          result.tags!.push(value!.replace(/\#/g, ""));
          parseState = { parsing: null, value: null };
        } else {
          parseState.value = [value, char].filter(Boolean).join("");
        }
      }
    }
  }
  return result;
};

const parsePagesStr = (pagesStr: string): PageRange => {
  const splitVals = pagesStr
    .trim()
    .split(",")
    .map((numStr) => numStr.trim());
  if (splitVals.length === 0) {
    throw new Error("Must have page numbers inside parens");
  }
  const numVals = splitVals.map((val) => parseInt(val));
  return numVals.length === 2 ? [numVals[0], numVals[1]] : numVals[0];
};
