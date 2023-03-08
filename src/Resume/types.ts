import React from "react";

/** If `string[]`, render as unordered list. */
type Summary = string | (string | JSX.Element)[] | JSX.Element;

export type RoleObject = {
  title: string;
  titleHref?: string;
  start?: string;
  end?: string;
  locationStr?: string;
  summary: Record<ToneOfVoice, Summary>;
  skills?: string[];
};

export type SectionHeaderObject = { href?: string };

export type ToneOfVoice = "Professional" | "Absurd";

export type ResumeState = { toneOfVoice: ToneOfVoice };

export type ResumeContextType = {
  state: ResumeState;
  dispatch: React.Dispatch<Identity<ResumeState>>;
};
