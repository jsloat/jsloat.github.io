import React, { useContext } from "react";
import { ResumeContextType, ResumeState } from "./types";

export const defaultResumeState: ResumeState = {
  targetRole: "Individual contributor",
  toneOfVoice: "Professional",
};

export const ResumeContext = React.createContext<ResumeContextType>({
  state: defaultResumeState,
  dispatch: () => {},
});

export const useResumeContext = () => useContext(ResumeContext);

//

const getStateAttrSetter =
  <K extends keyof ResumeState>(key: K) =>
  (val: ResumeState[K]): Identity<ResumeState> =>
  state => ({ ...state, [key]: val });

export const setTargetRole = getStateAttrSetter("targetRole");
export const setToneOfVoice = getStateAttrSetter("toneOfVoice");
