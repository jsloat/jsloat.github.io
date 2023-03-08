import React from "react";
import { colors } from "src/consts";
import styled, {
  css,
  FlattenSimpleInterpolation,
} from "styled-components/macro";
import { SectionHeaderObject } from "./types";
import openExternalIcon from "../assets/open-external.svg";

const SectionHeaderContainer = styled.div`
  border-bottom: 1px solid ${colors.slate[300]};
  margin-top: 2em;
  @media print {
    margin-top: 1.5em;
    border-bottom-color: black;
  }
`;

export const HideWhenPrinting = styled.div`
  @media print {
    display: none;
  }
`;

const OpenExternalImg = styled.img.attrs({ src: openExternalIcon })`
  width: 1em;
  height: 1em;
`;

const TextAndIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4em;
`;

const WithExternalUrlIconAnchor = styled.a`
  text-decoration: none;
  display: inline-block;
`;

const OpenExternalImgWrapper = styled.div`
  display: flex;
  @media print {
    display: none;
  }
`;

type WithExternalUrlIconProps = { href: string };
export const WithExternalUrlIcon = ({
  href,
  children,
}: React.PropsWithChildren<WithExternalUrlIconProps>) => (
  <WithExternalUrlIconAnchor href={href}>
    <TextAndIconWrapper>
      {children}
      <OpenExternalImgWrapper>
        <OpenExternalImg />
      </OpenExternalImgWrapper>
    </TextAndIconWrapper>
  </WithExternalUrlIconAnchor>
);

export const SectionHeader = ({
  children,
  href,
}: React.PropsWithChildren<SectionHeaderObject>) => {
  const contents = <h2>{children}</h2>;
  return (
    <SectionHeaderContainer>
      {href ? (
        <WithExternalUrlIcon href={href}>{contents}</WithExternalUrlIcon>
      ) : (
        contents
      )}
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

const ResumeSourceContainer = styled.div`
  font-size: 0.8em;
  font-style: italic;
  text-align: center;
  margin-top: 3em;
`;

export const ResumeSource = () => (
  <HideWhenPrinting>
    <ResumeSourceContainer>
      View résumé source on{" "}
      <a href="https://github.com/jsloat/jsloat.github.io/tree/master/src/Resume">
        Github
      </a>
    </ResumeSourceContainer>
  </HideWhenPrinting>
);
