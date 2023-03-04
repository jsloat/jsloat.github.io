import { INFO_KEYWORD_CLASSES, INFO_TABLE_KEYWORDS } from "../consts";

const parseInfoTableContent = (text: string) => {
  const tableKeyword = INFO_TABLE_KEYWORDS.find(keyword =>
    text.startsWith(keyword)
  );
  if (!tableKeyword) return;
  const className = INFO_KEYWORD_CLASSES[tableKeyword];
  const keywordPrefixRegex = new RegExp(`^${tableKeyword}: `);
  const updatedText = text.replace(keywordPrefixRegex, "");
  return { className, updatedText };
};

const updateTableEl = (tableEl: HTMLTableElement) => {
  const thEl = tableEl.querySelector("th");
  if (!thEl) return;
  const parsedTableInfo = parseInfoTableContent(thEl.innerText);
  if (!parsedTableInfo) return;
  const { className, updatedText } = parsedTableInfo;
  tableEl.classList.add(className);
  thEl.innerText = updatedText;
};

export default () => document.querySelectorAll("table").forEach(updateTableEl);
