import React from "react";
import { TOCTag } from "./types";
import styled from "styled-components/macro";

type Props = { allTags: TOCTag[] };

const Container = styled.div`
  font-family: monospace;
  margin-top: 3em;
  font-size: 0.8em;
`;

export default ({ allTags }: Props) => (
  <Container>
    {allTags.map(({ index, text }) => (
      <div key={index}>
        {index}. {text}
      </div>
    ))}
  </Container>
);
