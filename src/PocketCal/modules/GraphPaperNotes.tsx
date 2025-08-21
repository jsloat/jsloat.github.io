import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  box-sizing: border-box;
  height: 100%;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 8px;
`;

const GridArea = styled.div`
  flex: 1 1 auto;
  /* dot grid */
  background-image: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.8) 1px,
    transparent 1px
  );
  background-size: 5mm 5mm;
  background-position: 0 0;
  background-color: rgba(0, 0, 0, 0.01);
`;

export default function GraphPaperNotes() {
  return (
    <Wrapper aria-label="graph-paper-notes">
      <Title>Notes</Title>
      <GridArea />
    </Wrapper>
  );
}
