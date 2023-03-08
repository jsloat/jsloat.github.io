import React, { useReducer } from "react";
import { BaseContainer } from "src/atoms/Misc";
import { boxShadow, boxShadowPrefix } from "src/consts";
import { useKeyListener, useTitle } from "src/utils";
import styled, { css } from "styled-components/macro";
import { getMobileCSS, ResumeSource, SectionHeader, SkillBadge } from "./atoms";
import Contact from "./Contact";
import {
  defaultResumeState,
  ResumeContext,
  toggleToneOfVoice,
} from "./ResumeContext";
import Role from "./Role";
import {
  ARDOQ_FE_ENGINEER,
  ARDOQ_HEAD_MARKETING,
  ARDOQ_SENIOR_FE,
  ARDOQ_TEAM_LEAD,
  ATLASSIAN_OMM,
  ATLASSIAN_PMS,
  EDUCATION,
  PERSONAL_PROJECTS,
  SLOAT_MARKETING,
} from "./rolesData";
import ToneOfVoiceToggle from "./ToneOfVoiceToggle";
import { ResumeState } from "./types";

const PrintableWrapper = styled.div`
  @page {
    size: auto;
    margin: 0;
  }
  @media print {
    #container {
      font-size: 11.5px;
      padding: 0.25in 0.5in;
      margin: 0;
      ${boxShadowPrefix("none")}
      line-height: 1.4em;
    }
  }
`;

const absurdStyle = css`
  font-family: "Comic Sans", "Comic Sans MS", "Chalkboard",
    "ChalkboardSE-Regular", sans-serif;
  background-color: cyan;
  a {
    color: blue;
    &:hover {
      background-color: pink;
    }
  }
  ${SkillBadge} {
    background-color: antiquewhite;
  }
`;

const ResumeContainer = styled(BaseContainer)<ResumeState>`
  margin: 75px auto;
  ${getMobileCSS(
    css`
      margin: 0 auto;
    `
  )}
  ${({ toneOfVoice }) => toneOfVoice === "Absurd" && absurdStyle}
  ${boxShadow}
`;

const RolesContainer = styled.div`
  margin-bottom: 0.7em;
  > * {
    :first-child {
      margin-top: 0.4em;
    }
    :not(:first-child) {
      margin-top: 1.5em;
    }
  }
`;

const HalfWidthRolesContainer = styled.div`
  display: flex;
  gap: 1em;
  ${getMobileCSS(
    css`
      flex-wrap: wrap;
    `
  )}
  > div {
    width: 50%;
    ${getMobileCSS(css`
      width: 100%;
    `)}
  }
`;

const Resume = () => {
  const [state, dispatch] = useReducer(
    (state: ResumeState, reducer: Identity<ResumeState>) => reducer(state),
    defaultResumeState
  );
  useTitle("John Sloat's Résumé");
  useKeyListener(["t", "T"], () => dispatch(toggleToneOfVoice()));

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      <PrintableWrapper>
        <ResumeContainer id="container" {...state}>
          <h1>John Sloat</h1>
          <Contact />
          <ToneOfVoiceToggle />

          <SectionHeader href="https://www.ardoq.com/">Ardoq</SectionHeader>
          <RolesContainer>
            <Role {...ARDOQ_SENIOR_FE} />
            <Role {...ARDOQ_TEAM_LEAD} />
            <Role {...ARDOQ_FE_ENGINEER} />
            <Role {...ARDOQ_HEAD_MARKETING} />
          </RolesContainer>

          <SectionHeader>Sloat Marketing</SectionHeader>
          <RolesContainer>
            <Role {...SLOAT_MARKETING} />
          </RolesContainer>

          <SectionHeader href="https://www.atlassian.com/">
            Atlassian
          </SectionHeader>
          <RolesContainer>
            <HalfWidthRolesContainer>
              <Role {...ATLASSIAN_OMM} />
              <Role {...ATLASSIAN_PMS} />
            </HalfWidthRolesContainer>
          </RolesContainer>

          <SectionHeader>Education & Personal Projects</SectionHeader>
          <RolesContainer>
            <HalfWidthRolesContainer>
              <Role {...EDUCATION} />
              <Role {...PERSONAL_PROJECTS} />
            </HalfWidthRolesContainer>
          </RolesContainer>

          <ResumeSource />
        </ResumeContainer>
      </PrintableWrapper>
    </ResumeContext.Provider>
  );
};

export default Resume;
