import React from "react";

/** If `string[]`, render as unordered list. */
type Summary = string | string[];

export type RoleObject = {
  title: string;
  start: string;
  end: string;
  locationStr: string;
  summary: Record<ToneOfVoice, Summary>;
  skills?: string[];
};

export type SectionHeaderObject = { text: string; href?: string };

export type TargetRole = "Individual contributor" | "Team lead";

export type ToneOfVoice = "Professional" | "Absurd";

export type ResumeState = { targetRole: TargetRole; toneOfVoice: ToneOfVoice };

export type ResumeContextType = {
  state: ResumeState;
  dispatch: React.Dispatch<Identity<ResumeState>>;
};
