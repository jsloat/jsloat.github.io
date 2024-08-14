/** If only spans one page, the page range would simply have the same number for
 * start and end. */
export type PageRange = [start: number, end: number] | number;

export type TOCTag = { text: string; index: number };

export type TOCEntry = {
  /** Entries must have unique titles. */
  text: string;
  /** Entries are sorted by first-page-seen ascending, e.g. Any range starting
   * on page 1 will be sorted to the top. */
  pageRanges: PageRange[];
  tags: TOCTag[];
  isMonthEntry?: boolean;
};

export type TOCCreatorState = {
  title: string | null;
  tags: TOCTag[];
  entries: TOCEntry[];
  freehandText: string;
};

export type TOCEntryWithDumbTags = Omit<TOCEntry, "tags"> & { tags?: string[] };
