import React from "react";
import { colors } from "src/consts";
import styled, {
  css,
  FlattenSimpleInterpolation,
} from "styled-components/macro";
import { SectionHeaderObject } from "./types";

const SectionHeaderContainer = styled.div`
  border-bottom: 1px solid ${colors.slate[300]};
  margin-top: 2em;
  @media print {
    margin-top: 1.5em;
    border-bottom-color: black;
  }
`;

export const SectionHeader = ({ text, href }: SectionHeaderObject) => {
  const contents = <h2>{text}</h2>;
  return (
    <SectionHeaderContainer>
      {href ? <a href={href}>{contents}</a> : contents}
    </SectionHeaderContainer>
  );
};

export const getMobileCSS = (style: FlattenSimpleInterpolation) => css`
  @media screen and (max-width: 900px) {
    ${style}
  }
`;

export const RoleSummaryList = styled.ul`
  padding-inline-start: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  list-style-position: outside;
  margin-left: 19px;
  ${getMobileCSS(css`
    list-style-position: outside;
  `)};
`;

export const RoleSummaryText = styled.p`
  margin: 0;
`;

export const SkillBadge = styled.div`
  border: 1px solid ${colors.slate[600]};
  color: ${colors.slate[600]};
  padding: 0.15em 0.6em;
  display: inline-block;
  font-size: 0.8em;
  border-radius: 5px;
  line-height: 1.5em;
`;
