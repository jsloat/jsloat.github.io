import React from "react";
import styled from "styled-components/macro";

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0.4em 0;
  > input,
  label {
    cursor: pointer;
    margin: 0;
  }
`;

const StyledRadio = styled.input`
  height: 1.5em;
  width: 1.5em;
`;

type RadioProps = {
  value: string;
  onClick: () => any;
  isSelected?: boolean;
  name: string;
};
const Radio = ({ value, onClick, isSelected, name }: RadioProps) => (
  <RadioContainer>
    <StyledRadio
      type="radio"
      name={name}
      id={value}
      value={value}
      onChange={onClick}
      checked={isSelected}
    />
    <label htmlFor={value}>{value}</label>
  </RadioContainer>
);

type RadioGroupProps = { opts: Omit<RadioProps, "name">[]; name: string };
export const RadioGroup = ({ opts, name }: RadioGroupProps) => (
  <>
    {opts.map((radioOpts, i) => (
      <Radio name={name} key={`radio_${name}_${i}`} {...radioOpts} />
    ))}
  </>
);
