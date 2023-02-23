import React, { useState } from "react";
import styled from "styled-components/macro";
import { boxShadow, colors } from "./consts";
import { capitalize } from "./utils";

type ColorIdentifier = { categoryKey: string; weight: string };

const getColor = ({ categoryKey, weight }: ColorIdentifier) =>
  (colors as Record<string, Record<string, string>>)[categoryKey]?.[weight];

const copyColor = (id: ColorIdentifier) =>
  navigator.clipboard.writeText(getColor(id));

//

const PageContainer = styled.div`
  max-width: 900px;
  margin: 2em auto;
  background-color: white;
  padding: 2em 2em 0;
  border-radius: 4px;
  ${boxShadow}
`;

const CategoryContainer = styled.div`
  padding-bottom: 2em;
`;

const ColorCard = styled.div<{ color: string }>`
  ${({ color }) => `background-color: ${color};`}
  width: 100px;
  height: 100px;
  border: 1px solid white;
`;

const CopiedIndicator = styled.div`
  width: 100%;
  height: 100%;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255 255 255 / 50%);
  animation: fadeaway 0.5s linear 2s 1 normal forwards;
  @keyframes fadeaway {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const ColorLabel = styled.div`
  text-align: center;
`;

const ColorContainer = styled.div`
  cursor: pointer;
`;

const ColorsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 1em;
  flex-wrap: wrap;
`;

//

const Color = (id: ColorIdentifier) => {
  const [justCopied, setJustCopied] = useState(false);
  const showJustCopied = () => {
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 2500);
  };
  return (
    <ColorContainer
      onClick={() => {
        copyColor(id);
        showJustCopied();
      }}
    >
      <ColorCard color={getColor(id)}>
        {justCopied && <CopiedIndicator>Copied!</CopiedIndicator>}
      </ColorCard>
      <ColorLabel>{id.weight}</ColorLabel>
    </ColorContainer>
  );
};

export default () => (
  <PageContainer>
    {Object.entries(colors).map(([categoryKey, weightRecord]) => (
      <CategoryContainer key={categoryKey}>
        <h1>{capitalize(categoryKey)}</h1>
        <ColorsContainer>
          {Object.entries(weightRecord).map(([weight]) => {
            return (
              <Color
                categoryKey={categoryKey}
                weight={weight}
                key={`${categoryKey}_${weight}`}
              />
            );
          })}
        </ColorsContainer>
      </CategoryContainer>
    ))}
  </PageContainer>
);
