import React from "react";
import { SLATE_300, SLATE_600 } from "src/consts";
import styled, {
  css,
  FlattenSimpleInterpolation,
} from "styled-components/macro";
import { SectionHeaderObject } from "./types";

const SectionHeaderContainer = styled.div`
  border-bottom: 1px solid ${SLATE_300};
  margin-top: 2em;
`;

export const SectionHeader = ({ text, href }: SectionHeaderObject) => {
  const contents = <h2>{text}</h2>;
  return (
    <SectionHeaderContainer>
      {href ? <a href={href}>{contents}</a> : contents}
    </SectionHeaderContainer>
  );
};

const ROLE_SUMMARY_MARGIN_TOP = "0.4em";

export const getMobileCSS = (style: FlattenSimpleInterpolation) => css`
  @media screen and (max-width: 900px) {
    ${style}
  }
`;

export const RoleSummaryList = styled.ul`
  padding-inline-start: 0;
  margin-block-start: ${ROLE_SUMMARY_MARGIN_TOP};
  margin-block-end: 0;
  list-style-position: inside;
  ${getMobileCSS(css`
    list-style-position: outside;
  `)}
`;

export const RoleSummaryText = styled.p`
  margin-top: ${ROLE_SUMMARY_MARGIN_TOP};
`;

export const SkillBadge = styled.div`
  border: 1px solid ${SLATE_600};
  color: ${SLATE_600};
  padding: 0.3em 0.6em;
  display: inline-block;
  font-size: 0.8em;
  border-radius: 5px;
`;
