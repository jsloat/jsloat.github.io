import React, { useContext } from "react";
import { ResumeContextType, ResumeState } from "./types";

export const defaultResumeState: ResumeState = { toneOfVoice: "Professional" };

export const ResumeContext = React.createContext<ResumeContextType>({
  state: defaultResumeState,
  dispatch: () => {},
});

export const useResumeContext = () => useContext(ResumeContext);

//

export const toggleToneOfVoice = (): Identity<ResumeState> => state => ({
  ...state,
  toneOfVoice: state.toneOfVoice === "Absurd" ? "Professional" : "Absurd",
});
