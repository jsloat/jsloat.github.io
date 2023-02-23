import React from "react";
import { boxShadowPrefix, colors } from "src/consts";
import styled from "styled-components/macro";

const ButtonContainer = styled.div`
  background-color: ${colors.blue[500]};
  display: inline-block;
  color: ${colors.slate[100]};
  padding: 0.4em 1.3em;
  border-radius: 10px;
  font-weight: 500;
  box-shadow: ${boxShadowPrefix(`1px 1px 1px 0px ${colors.blue[400]}`)};
  cursor: pointer;
  transition: all 0.3s;
  user-select: none;
  &:hover {
    background-color: ${colors.blue[600]};
  }
`;

type ButtonProps = React.PropsWithChildren<{ onClick: () => any }>;

export default ({ children, onClick }: ButtonProps) => (
  <ButtonContainer onClick={onClick}>{children}</ButtonContainer>
);
