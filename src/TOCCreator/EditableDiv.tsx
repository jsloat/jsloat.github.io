import React, { useRef, useState } from "react";
import { colors } from "src/consts";
import styled, { css } from "styled-components/macro";

type Props = {
  inputText: string | null;
  displayContent: React.ReactNode | string | null;
  onInputChange: (newText: string) => any;
  placeholder: string;
  style?: React.CSSProperties;
};

const DisplayText = styled.div<{ isFaded: boolean }>`
  cursor: pointer;
  ${({ isFaded }) =>
    isFaded &&
    css`
      opacity: 0.5;
    `}
  &:hover {
    background-color: ${colors.slate[200]};
  }
`;

export default ({
  inputText,
  displayContent,
  onInputChange,
  placeholder,
  style,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  if (!isEditing) {
    return (
      <DisplayText
        onClick={() => setIsEditing(true)}
        style={style}
        isFaded={!displayContent}
      >
        {displayContent || placeholder}
      </DisplayText>
    );
  }
  return (
    <input
      value={inputText ?? ""}
      placeholder={placeholder}
      onChange={event => onInputChange(event.target.value)}
      onBlur={() => setIsEditing(false)}
      ref={inputRef}
      autoFocus
      style={style}
    />
  );
};
