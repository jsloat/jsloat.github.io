import React from "react";
import Button from "src/atoms/Button";
import Radio from "src/atoms/Radio";
import { boxShadow } from "src/consts";
import { isDevMode } from "src/utils";
import styled from "styled-components/macro";
import {
  setTargetRole,
  setToneOfVoice,
  useResumeContext,
} from "../ResumeContext";
import { TargetRole, ToneOfVoice } from "../types";

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

type SettingsProps = { hideSettings: () => void };

export const Settings = ({ hideSettings }: SettingsProps) => {
  const { state, dispatch } = useResumeContext();
  const { toneOfVoice, targetRole } = state;
  return (
    <Dialog>
      <DialogContents>
        <Section>
          <SectionHeader>Tone of voice</SectionHeader>
          {(["Professional", "Laid-back"] as ToneOfVoice[]).map(value => (
            <Radio
              onClick={() => dispatch(setToneOfVoice(value))}
              isSelected={toneOfVoice === value}
              key={value}
            >
              {value}
            </Radio>
          ))}
        </Section>

        {(isDevMode() || document.location.search.includes("edit")) && (
          <Section>
            <SectionHeader>Target role</SectionHeader>
            {(["Individual contributor", "Team lead"] as TargetRole[]).map(
              value => (
                <Radio
                  onClick={() => dispatch(setTargetRole(value))}
                  isSelected={targetRole === value}
                  key={value}
                >
                  {value}
                </Radio>
              )
            )}
          </Section>
        )}

        <Footer>
          <Button onClick={hideSettings}>Done</Button>
        </Footer>
      </DialogContents>
    </Dialog>
  );
};
