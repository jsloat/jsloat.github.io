import React from "react";
import styled from "styled-components/macro";
import { RoleSummaryList, RoleSummaryText, SkillBadge } from "../atoms";
import { RoleObject } from "../types";
import TitleRow from "./TitleRow";

const SkillsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const namespacedKey = ({
  title,
  i,
  namespace,
}: Pick<RoleObject, "title"> & { i: number; namespace: string }) =>
  `${title}_${namespace}_${i}`;

const Summary = ({ summary, title }: Pick<RoleObject, "summary" | "title">) =>
  Array.isArray(summary) ? (
    <RoleSummaryList>
      {summary.map((item, i) => (
        <li key={namespacedKey({ title, i, namespace: "roleSummaryList" })}>
          {item}
        </li>
      ))}
    </RoleSummaryList>
  ) : (
    <RoleSummaryText>{summary}</RoleSummaryText>
  );

const Role = ({ summary, skills, title, ...restProps }: RoleObject) => (
  <div>
    <TitleRow title={title} {...restProps} />
    <Summary summary={summary} title={title} />
    {skills?.length && (
      <SkillsContainer>
        {skills.map((skill, i) => (
          <SkillBadge key={namespacedKey({ title, i, namespace: "skill" })}>
            {skill}
          </SkillBadge>
        ))}
      </SkillsContainer>
    )}
  </div>
);

export default Role;
