import React, { useEffect, useMemo, useReducer, useState } from "react";
import { HideWhenPrinting, PrintableWrapper } from "src/atoms";
import { ExcludeFalsy, useTitle } from "src/utils";
import styled from "styled-components/macro";
import { BaseContainer } from "src/atoms/Misc";
import Entry from "./Entry";
import TagFootnote from "./TagFootnote";
import {
  TOCCreatorState,
  TOCEntry,
  TOCEntryWithDumbTags,
  TOCTag,
} from "./types";
import {
  TOCCreatorContext,
  actions,
  defaultTOCCreatorState,
} from "./TOCCreatorContext";
import Title from "./Title";
import parseFreehand from "./parseFreehand";

const Container = styled(BaseContainer)`
  margin: 75px auto;
  @media print {
    padding-left: 1in !important;
    font-size: 11.5px;
  }
`;

//

const getMinPage = ({ pageRanges }: TOCEntry) =>
  Math.min(
    ...pageRanges.map((value) => (Array.isArray(value) ? value[0] : value))
  );

const sortEntries: SortFn<TOCEntry> = (a, b) => {
  const aMinPage = getMinPage(a);
  const bMinPage = getMinPage(b);
  if (aMinPage < bMinPage) return -1;
  if (bMinPage < aMinPage) return 1;
  if (aMinPage === bMinPage) {
    if (a.isMonthEntry && !b.isMonthEntry) return -1;
    if (b.isMonthEntry && !a.isMonthEntry) return 1;
  }
  return 0;
};

const rawDataToEntriesAndTags = (
  rawData: TOCEntryWithDumbTags[]
): { entries: TOCEntry[]; tags: TOCTag[] } => {
  const tags = rawData.reduce((acc, entry) => {
    const accClone = [...acc];
    entry.tags?.forEach((entryTagText) => {
      const tagExists = acc.some((tag) => tag.text === entryTagText);
      if (tagExists) return;
      const nextIndex = accClone.length + 1;
      accClone.push({ index: nextIndex, text: entryTagText });
    });
    return accClone;
  }, [] as TOCTag[]);
  const entries = rawData
    .map<TOCEntry>(({ tags: rawEntryTags, ...rest }) => ({
      tags:
        rawEntryTags
          ?.map((rawEntryTag) => tags.find((t) => t.text === rawEntryTag))
          .filter(ExcludeFalsy) ?? [],
      ...rest,
    }))
    .sort(sortEntries);
  return { entries, tags };
};

//

export default () => {
  const [state, dispatch] = useReducer(
    (state: TOCCreatorState, reducer: Identity<TOCCreatorState>) =>
      reducer(state),
    defaultTOCCreatorState
  );
  useTitle("Printable TOC creator");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [parsedDumbEntries, setParsedDumbEntries] = useState<
    TOCEntryWithDumbTags[]
  >([]);

  useEffect(() => {
    const parsedFreehand = parseFreehand(state.freehandText);
    setErrorMessage(parsedFreehand.errorMessage ?? null);
    if (parsedFreehand.entries) setParsedDumbEntries(parsedFreehand.entries);
  }, [state.freehandText]);

  const parsedData = useMemo(
    () => rawDataToEntriesAndTags(parsedDumbEntries),
    [parsedDumbEntries]
  );

  return (
    <TOCCreatorContext.Provider value={{ state, dispatch }}>
      <PrintableWrapper>
        <HideWhenPrinting>
          <Container>
            {errorMessage && (
              <b style={{ color: "red" }}>Error: {errorMessage}</b>
            )}
            <FreehandInput
              onChange={(e) =>
                dispatch(actions.setFreehandText(e.target.value))
              }
            >
              {state.freehandText}
            </FreehandInput>
          </Container>
        </HideWhenPrinting>

        <Container id="container">
          <Title />
          {parsedData.entries.map((entry, i) => (
            <Entry {...entry} key={i} />
          ))}
          <TagFootnote allTags={parsedData.tags} />
        </Container>
      </PrintableWrapper>
    </TOCCreatorContext.Provider>
  );
};

const FreehandInput = styled.textarea`
  width: 100%;
  height: 250px;
`;
