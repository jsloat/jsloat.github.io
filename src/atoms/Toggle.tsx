import React from "react";
import { colors } from "src/consts";
import styled, { css } from "styled-components/macro";

type IsSelected = { isSelected: boolean };

type ToggleOption = { label: string } & IsSelected;

type ToggleProps = {
  options: [leftOption: ToggleOption, rightOption: ToggleOption];
  onChange?: () => any;
};

const Container = styled.div`
  display: inline-block;
`;

const InnerContainer = styled.div`
  display: flex;
  gap: 0.4em;
  align-items: center;
`;

const Label = styled.div<IsSelected>`
  text-transform: uppercase;
  font-size: 0.7em;
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "300")};
`;

type ToggleContainerProps = { isRight: boolean };
const ToggleContainer = styled.div<ToggleContainerProps>`
  border-radius: 1.25em;
  background-color: ${colors.blue[700]};
  height: 1.25em;
  width: 2.75em;
  padding: 3px;
  cursor: pointer;
  user-select: none;
  display: flex;
  ${({ isRight }) =>
    isRight &&
    css`
      justify-content: flex-end;
    `};
`;

const Toggle = styled.div`
  background-color: white;
  border-radius: 50%;
  width: 1.25em;
  height: 1.25em;
  align-self: baseline;
`;

export default ({ options: [opt1, opt2], onChange }: ToggleProps) => (
  <Container>
    <InnerContainer>
      <Label isSelected={opt1.isSelected}>{opt1.label}</Label>
      <ToggleContainer isRight={opt2.isSelected} onClick={onChange}>
        <Toggle />
      </ToggleContainer>
      <Label isSelected={opt2.isSelected}>{opt2.label}</Label>
    </InnerContainer>
  </Container>
);
