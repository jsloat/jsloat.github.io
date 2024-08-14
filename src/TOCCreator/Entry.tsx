import React from "react";
import { PageRange, TOCEntry } from "./types";
import styled, { CSSObject, css } from "styled-components/macro";

const Container = styled.div<{ style?: CSSObject }>`
  ${({ style }) => css`
    display: flex;
    gap: 5px;
    align-items: flex-end;
    height: 2em;
    ${style}
  `}
`;

// https://stackoverflow.com/a/27279246
const DottedLine = styled.div`
  flex: 0 1 auto;
  overflow: hidden;
  &:before {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
    content: ". . . . . . . . . . . . . . . . . . . . "
      ". . . . . . . . . . . . . . . . . . . . "
      ". . . . . . . . . . . . . . . . . . . . "
      ". . . . . . . . . . . . . . . . . . . . "
      ". . . . . . . . . . . . . . . . . . . . "
      ". . . . . . . . . . . . . . . . . . . . "
      ". . . . . . . . . . . . . . . . . . . . ";
  }
`;

const Citation = styled.sup`
  margin-left: 5px;
  font-family: monospace;
`;

const pageRangeToStr = (range: PageRange) =>
  Array.isArray(range) ? `${range[0]}-${range[1]}` : range;

const pageRangesToStr = (pageRanges: PageRange[]) =>
  pageRanges.map(pageRangeToStr).join(", ");

export default ({ text, pageRanges, tags, isMonthEntry }: TOCEntry) => {
  return (
    <Container
      style={{
        ...(isMonthEntry && {
          marginTop: "20px",
          borderBottom: "1px solid",
        }),
      }}
    >
      <div
        style={{
          flex: "1 0 auto",
          fontWeight: isMonthEntry ? "bold" : "inherit",
        }}
      >
        {text}
        {Boolean(tags.length) && (
          <Citation>{tags.map(({ index }) => index).join(",")}</Citation>
        )}
      </div>
      {!isMonthEntry && <DottedLine />}
      <div
        style={{
          flex: "0 0 auto",
          ...(isMonthEntry && { fontWeight: "bold" }),
        }}
      >
        {pageRangesToStr(pageRanges)}
      </div>
    </Container>
  );
};
