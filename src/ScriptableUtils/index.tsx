import { marked } from "marked";
import React from "react";
import { colors } from "src/consts";
import { defaultFontFamily } from "src/GlobalStyle";
import styled, { css } from "styled-components/macro";
import { getScriptableMobileCSS, useFetchMarkdown } from "./utils";
import { useLocation } from "react-router-dom";
import { useTitle } from "src/utils";
import {
  CODEBLOCK_PARENT_CLASS,
  containerPadding,
  COPY_BUTTON_CLASS,
  DID_COPY_CLASS,
  INFO_KEYWORD_CLASSES,
  INLINE_CODE_CLASS,
} from "./consts";
import Sidebar from "./Sidebar";
import useCustomizeMarkdownGeneratedHTML from "./useCustomizeMarkdownGeneratedHTML";
import { findScriptableRoute } from "./routeMetadata";

const Container = styled.div`
  padding: 1em 0 0;
  ${getScriptableMobileCSS(
    css`
      padding: 0;
    `
  )}
  width: 100%;
  strong {
    font-weight: 500;
  }
  code.${INLINE_CODE_CLASS} {
    background-color: ${colors.blue[50]};
    padding: 0 0.3em;
    border-radius: 1px;
    font-size: 0.9em;
  }
  .${CODEBLOCK_PARENT_CLASS} {
    background-color: ${colors.slate[600]};
    color: ${colors.slate[200]};
    border-radius: 4px;
    padding: 1em;
    display: flex;
    justify-content: space-between;
  }
  pre {
    white-space: pre-wrap;
  }
  .${COPY_BUTTON_CLASS} {
    color: ${colors.slate[200]};
    border: 1px solid ${colors.slate[200]};
    display: flex;
    padding: 0.25em;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    ${defaultFontFamily}
    transition: all 0.3s;
    > img {
      width: 1.2em;
      height: 1.2em;
      filter: brightness(0) saturate(100%) invert(96%) sepia(6%) saturate(778%)
        hue-rotate(182deg) brightness(96%) contrast(95%);
    }
    &.${DID_COPY_CLASS} {
      background-color: ${colors.emerald[600]};
    }
    &:not(.${DID_COPY_CLASS}):hover {
      background-color: ${colors.slate[500]};
    }
  }
  table {
    margin: 2em 0;
    border-left: 7px solid;
    padding: 0.4em 1em;
    border-radius: 5px;
    text-align: left;
    width: 100%;
    &.${INFO_KEYWORD_CLASSES.INFO} {
      background-color: ${colors.blue[100]};
      border-color: ${colors.blue[600]};
    }
    &.${INFO_KEYWORD_CLASSES.WARNING} {
      background-color: ${colors.amber[100]};
      border-color: ${colors.amber[600]};
    }
    th {
      font-weight: normal;
    }
  }
  h1,
  h2,
  h3,
  h4 {
    display: block;
    margin: 1.5em 0 0.5em;
  }
  h1 {
    margin-top: 0;
  }
  p {
    margin: 0.7em 0 1em;
  }
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentContainer = styled.div`
  ${containerPadding}
  background-color: white;
  width: 100%;
  max-width: 800px;
`;

const GetHelpFooter = styled.div`
  padding: 3em 0;
  text-align: center;
`;

const MobileWarningBanner = styled.div`
  background-color: ${colors.amber[400]};
  text-align: center;
  padding: 1em;
`;

const useScriptableTitle = (routePath: string) => {
  const matchingRoute = findScriptableRoute(routePath);
  const title = [matchingRoute?.label, "Scriptable Utils"]
    .filter(Boolean)
    .join(" | ");
  return useTitle(title);
};

export default () => {
  const { pathname: routePath } = useLocation();
  const markdown = useFetchMarkdown(routePath);
  useCustomizeMarkdownGeneratedHTML();
  useScriptableTitle(routePath);

  return (
    <>
      {window.innerWidth < 650 && (
        <MobileWarningBanner>
          Sorry, I haven't added responsive support yet.
        </MobileWarningBanner>
      )}
      <Container>
        <PageContainer>
          <Sidebar routePath={routePath} />
          <ContentContainer>
            <div
              dangerouslySetInnerHTML={{
                __html: marked.parse(markdown),
              }}
            />
          </ContentContainer>
        </PageContainer>
        <GetHelpFooter>
          Have a question, or is something not working?{" "}
          <a href="https://github.com/jsloat/jsloat.github.io/issues/new">
            File a GitHub issue
          </a>
          .
        </GetHelpFooter>
      </Container>
    </>
  );
};
