import React from "react";
import { RadioGroup } from "src/atoms";
import { boxShadow, SLATE_900 } from "src/consts";
import styled from "styled-components/macro";
import { setToneOfVoice, useResumeContext } from "../ResumeContext";

const Dialog = styled.div`
  border: 0;
  ${boxShadow}
  border-radius: 5px;
  min-width: 300px;
  max-width: 500px;
  background-color: white;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: ${SLATE_900};
  color: white;
  padding: 0.7em 1.2em;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const CloseButton = styled.div`
  font-size: 1.8em;
  cursor: pointer;
  height: 1em;
`;

const DialogContents = styled.div`
  padding: 2em;
`;

const SectionHeader = styled.div`
  font-weight: bold;
`;

type SettingsProps = { hideSettings: () => void };

export const Settings = ({ hideSettings }: SettingsProps) => {
  const { state, dispatch } = useResumeContext();
  const { toneOfVoice } = state;
  return (
    <Dialog>
      <Toolbar>
        <CloseButton onClick={hideSettings}>&times;</CloseButton>
      </Toolbar>
      <DialogContents>
        <form>
          <SectionHeader>Tone of voice</SectionHeader>
          <RadioGroup
            name="tone of voice"
            opts={[
              {
                value: "Professional",
                onClick: () => dispatch(setToneOfVoice("Professional")),
                isSelected: toneOfVoice === "Professional",
              },
              {
                value: "Laid-back",
                onClick: () => dispatch(setToneOfVoice("Laid-back")),
                isSelected: toneOfVoice === "Laid-back",
              },
            ]}
          />
        </form>
      </DialogContents>
    </Dialog>
  );
};
