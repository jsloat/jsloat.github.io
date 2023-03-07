import React from "react";
import styled, { css } from "styled-components/macro";
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
  if (!Array.isArray(visibleSummary)) {
    return <RoleSummaryText>{visibleSummary}</RoleSummaryText>;
  }
  return (
    <RoleSummaryList>
      {visibleSummary.map((item, i) => (
        <li key={`roleSummaryList_${title}_${i}`}>{item}</li>
      ))}
    </RoleSummaryList>
  );
};

const RoleContainer = styled.div<Pick<RoleObject, "isHalfWidth">>`
  width: 100%;
  flex-shrink: 0;
  ${({ isHalfWidth }) =>
    isHalfWidth &&
    css`
      width: 50%;
      margin-top: 0.4em !important;
    `};
`;

const Role = ({
  summary,
  skills,
  title,
  isHalfWidth,
  ...restProps
}: RoleObject) => (
  <RoleContainer isHalfWidth={isHalfWidth}>
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
