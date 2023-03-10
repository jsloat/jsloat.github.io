import React from "react";
import { isString } from "src/utils";
import styled from "styled-components/macro";
import { RoleSummaryList, RoleSummaryText, SkillBadge } from "../atoms";
import { useResumeContext } from "../ResumeContext";
import { RoleObject } from "../types";
import TitleRow from "./TitleRow";

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
  const visibleSummary = summary[state.toneOfVoice];
  if (isString(visibleSummary)) {
    return <RoleSummaryText>{visibleSummary}</RoleSummaryText>;
  }
  if (Array.isArray(visibleSummary)) {
    return (
      <RoleSummaryList>
        {visibleSummary.map((item, i) => (
          <li key={`roleSummaryList_${title}_${i}`}>{item}</li>
        ))}
      </RoleSummaryList>
    );
  }
  return visibleSummary;
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
