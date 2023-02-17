export type a = 1;
export type RoleObject = {
  title: string;
  start: string;
  end: string;
  locationStr: string;
  /** If `string[]`, render as unordered list. */
  summary: string | string[];
  skills?: string[];
};

export type SectionHeaderObject = { text: string; href?: string };
