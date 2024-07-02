import React from "react";
import { ExcludeFalsy, isString } from "src/utils";
import styled from "styled-components/macro";
import { RoleSummaryList, RoleSummaryText, SkillBadge } from "../atoms";
import { useResumeContext } from "../ResumeContext";
import { RoleObject } from "../types";
import TitleRow from "./TitleRow";
import { HideWhenPrinting } from "src/atoms";

const SkillsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 0.5em;
  flex-wrap: wrap;
  @media print {
    margin-top: 0.2em;
  }
`;

const Summary = ({ summary, title }: Pick<RoleObject, "summary" | "title">) => {
  const { state } = useResumeContext();
  const summaryItems = summary[state.toneOfVoice].filter(ExcludeFalsy);
  switch (summaryItems.length) {
    case 0:
      return null;
    case 1: {
      const { content, hideWhenPrinting = false } = summaryItems[0];
      return (
        <HideWhenPrinting hide={hideWhenPrinting}>
          {isString(content) ? (
            <RoleSummaryText>{content}</RoleSummaryText>
          ) : (
            content
          )}
        </HideWhenPrinting>
      );
    }
    default: {
      return (
        <RoleSummaryList>
          {summaryItems.map(({ content, hideWhenPrinting = false }, i) => (
            <HideWhenPrinting hide={hideWhenPrinting}>
              <li key={`roleSummaryList_${title}_${i}`}>{content}</li>
            </HideWhenPrinting>
          ))}
        </RoleSummaryList>
      );
    }
  }
};

const RoleContainer = styled.div`
  width: 100%;
  flex-shrink: 0;
`;

const Role = ({ summary, skills, title, ...restProps }: RoleObject) => (
  <RoleContainer>
    <TitleRow title={title} {...restProps} />
    <Summary summary={summary} title={title} />
    {skills?.length && (
      <SkillsContainer>
        {skills.map((skill, i) => (
          <SkillBadge key={`skill_${title}_${i}`}>{skill}</SkillBadge>
        ))}
      </SkillsContainer>
    )}
  </RoleContainer>
);

export default Role;
