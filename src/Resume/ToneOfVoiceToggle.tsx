import React from "react";
import Toggle from "src/atoms/Toggle";
import { boxShadowPrefix, colors } from "src/consts";
import styled from "styled-components/macro";
import { HideWhenPrinting } from "./atoms";
import { toggleToneOfVoice, useResumeContext } from "./ResumeContext";

const ToggleContainer = styled.div`
  border: 2px solid ${colors.slate[300]};
  background-color: ${colors.slate[100]};
  border-radius: 4px;
  display: inline-block;
  padding: 0.5em 1em;
  margin-top: 1em;
  cursor: pointer;
  user-select: none;
`;

const TopRowContainer = styled.div`
  display: flex;
  gap: 5em;
  align-items: center;
`;

const Title = styled.div`
  color: ${colors.slate[600]};
`;

const KeyboardShortcut = styled.span`
  color: ${colors.slate[400]};
  border: 2px solid ${colors.slate[400]};
  border-radius: 4px;
  padding: 0.2em 0.4em;
  line-height: 1em;
  font-weight: 600;
  ${boxShadowPrefix(`0px 3px 0px 0px ${colors.slate[300]}`)}
`;

export default () => {
  const {
    state: { toneOfVoice },
    dispatch,
  } = useResumeContext();
  const question = toneOfVoice === "Absurd" ? "Eyes bleeding" : "Bored";
  return (
    <HideWhenPrinting>
      <ToggleContainer onClick={() => dispatch(toggleToneOfVoice())}>
        <TopRowContainer>
          <Title>{`${question}? Try a new tone of voice.`}</Title>
          <KeyboardShortcut>T</KeyboardShortcut>
        </TopRowContainer>
        <Toggle
          options={[
            {
              label: "Professional",
              isSelected: toneOfVoice === "Professional",
            },
            { label: "Absurd", isSelected: toneOfVoice === "Absurd" },
          ]}
        />
      </ToggleContainer>
    </HideWhenPrinting>
  );
};
