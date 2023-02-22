import React from "react";
import { RadioGroup } from "src/atoms";
import { boxShadow, SLATE_900 } from "src/consts";
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
  border-radius: 40px 5px;
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
  border-top-left-radius: 40px;
  border-top-right-radius: 5px;
  box-shadow: 0 2px 4px 0px rgb(170 170 170 / 75%);
`;

const CloseButton = styled.div`
  font-size: 1.8em;
  cursor: pointer;
  height: 1em;
`;

const DialogContents = styled.div`
  padding: 0 2em 2em;
`;

const SectionHeader = styled.div`
  font-weight: bold;
  margin-top: 2em;
`;

const SettingsForm = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Section = styled.div`
  width: 50%;
  min-width: 180px;
`;

type SettingsProps = { hideSettings: () => void };

export const Settings = ({ hideSettings }: SettingsProps) => {
  const { state, dispatch } = useResumeContext();
  const { toneOfVoice, targetRole } = state;
  return (
    <Dialog>
      <Toolbar>
        <CloseButton onClick={hideSettings}>&times;</CloseButton>
      </Toolbar>
      <DialogContents>
        <SettingsForm>
          <Section>
            <SectionHeader>Tone of voice</SectionHeader>
            <RadioGroup
              name="tone of voice"
              opts={(["Professional", "Laid-back"] as ToneOfVoice[]).map(
                value => ({
                  value,
                  onClick: () => dispatch(setToneOfVoice(value)),
                  isSelected: toneOfVoice === value,
                })
              )}
            />
          </Section>

          {(isDevMode() || document.location.search.includes("edit")) && (
            <Section>
              <SectionHeader>Target role</SectionHeader>
              <RadioGroup
                name="target role"
                opts={(
                  ["Individual contributor", "Team lead"] as TargetRole[]
                ).map(value => ({
                  value,
                  onClick: () => dispatch(setTargetRole(value)),
                  isSelected: targetRole === value,
                }))}
              />
            </Section>
          )}
        </SettingsForm>
      </DialogContents>
    </Dialog>
  );
};
