import React from "react";
import styled, { css } from "styled-components/macro";
import { colors } from "../consts";

type IsSelectedProp = { isSelected?: boolean };

type RadioProps = React.PropsWithChildren<{ onClick: () => any }> &
  IsSelectedProp;

const SELECTED_WIDTH_PX = 7;
const SELECTED_WIDTH = `${SELECTED_WIDTH_PX}px`;
const SELECTED_BORDER_PX = 6;
const SELECTED_BORDER = `${SELECTED_BORDER_PX}px solid ${colors.blue[900]}`;
const SELECTED_TOTAL_WIDTH_PX = 2 * SELECTED_BORDER_PX + SELECTED_WIDTH_PX;
const DESELECTED_BORDER_PX = 1;
const DESELECTED_BORDER = `${DESELECTED_BORDER_PX}px solid ${colors.slate[200]}`;
const DESELECTED_WIDTH = `${
  SELECTED_TOTAL_WIDTH_PX - 2 * DESELECTED_BORDER_PX
}px`;

const RadioCircle = styled.div<IsSelectedProp>`
  border-radius: 50%;
  transition: all 0.3s;
  width: ${({ isSelected }) =>
    isSelected ? SELECTED_WIDTH : DESELECTED_WIDTH};
  height: ${({ isSelected }) =>
    isSelected ? SELECTED_WIDTH : DESELECTED_WIDTH};
  border: ${({ isSelected }) =>
    isSelected ? SELECTED_BORDER : DESELECTED_BORDER};
`;

const RadioContainer = styled.div<IsSelectedProp>`
  display: flex;
  align-items: center;
  gap: 0.7em;
  margin: 0.4em 0;
  border: 1px solid ${colors.slate[200]};
  border-radius: 11px;
  padding: 0.5em;
  user-select: none;
  cursor: pointer;
  background-color: ${({ isSelected }) =>
    isSelected ? colors.slate[100] : "unset"};
  transition: all 0.3s;
  &:hover {
    border-color: ${colors.slate[300]};
    ${RadioCircle} {
      ${({ isSelected }) =>
        !isSelected &&
        css`
          border-color: ${colors.slate[300]};
        `}
    }
  }
`;

const Radio = ({ children, onClick, isSelected }: RadioProps) => (
  <RadioContainer onClick={onClick} isSelected={isSelected}>
    <RadioCircle isSelected={isSelected} />
    <div>{children}</div>
  </RadioContainer>
);

export default Radio;
