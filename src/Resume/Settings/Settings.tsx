import React from "react";
import Button from "src/atoms/Button";
import Radio from "src/atoms/Radio";
import { boxShadow } from "src/consts";
import styled from "styled-components/macro";
import { setToneOfVoice, useResumeContext } from "../ResumeContext";
import { ToneOfVoice } from "../types";

const Dialog = styled.div`
  border: 0;
  ${boxShadow}
  border-radius: 1em;
  min-width: 300px;
  max-width: 500px;
  background-color: white;
`;

const DialogContents = styled.div`
  padding: 2em;
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

const SectionHeader = styled.div`
  font-weight: bold;
`;

const Section = styled.div`
  min-width: 180px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DoneButton = styled(Button)`
  width: 100%;
`;

type SettingsProps = { hideSettings: () => void };

export const Settings = ({ hideSettings }: SettingsProps) => {
  const { state, dispatch } = useResumeContext();
  const { toneOfVoice } = state;
  return (
    <Dialog>
      <DialogContents>
        <Section>
          <SectionHeader>Tone of voice</SectionHeader>
          {(["Professional", "Absurd"] as ToneOfVoice[]).map(value => (
            <Radio
              onClick={() => dispatch(setToneOfVoice(value))}
              isSelected={toneOfVoice === value}
              key={value}
            >
              {value}
            </Radio>
          ))}
        </Section>
        <Footer>
          <DoneButton onClick={hideSettings}>Done</DoneButton>
        </Footer>
      </DialogContents>
    </Dialog>
  );
};
