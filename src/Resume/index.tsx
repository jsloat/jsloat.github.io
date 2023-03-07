import React, { useReducer } from "react";
import { BaseContainer } from "src/atoms/Misc";
import { boxShadow, boxShadowPrefix } from "src/consts";
import { useModal } from "src/Modal";
import { useKeyListener, useTitle } from "src/utils";
import styled, { css } from "styled-components/macro";
import { SectionHeader, SkillBadge } from "./atoms";
import Contact from "./Contact";
import {
  defaultResumeState,
  ResumeContext,
  setToneOfVoice,
} from "./ResumeContext";
import Role from "./Role";
import getRolesData from "./rolesData";
import { Settings } from "./Settings/Settings";
import { SettingsToggle } from "./Settings/SettingsToggle";
import { ResumeState } from "./types";

const PrintableWrapper = styled.div`
  @page {
    size: auto;
    margin: 0;
  }
  @media print {
    #container {
      font-size: 12px;
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
  @media print {
    > * {
      :not(:first-child) {
        margin-top: 0.9em;
      }
    }
  }
`;

const Source = styled.div`
  font-size: 0.8em;
  font-style: italic;
  text-align: center;
  margin-top: 3em;
  @media print {
    display: none;
  }
`;

const Resume = () => {
  const [state, dispatch] = useReducer(
    (state: ResumeState, reducer: Identity<ResumeState>) => reducer(state),
    defaultResumeState
  );
  useTitle("John Sloat's Résumé");
  const { Modal, setIsModalActive } = useModal();
  useKeyListener("t", () =>
    dispatch(
      setToneOfVoice(state.toneOfVoice === "Absurd" ? "Professional" : "Absurd")
    )
  );

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      <SettingsToggle showSettings={() => setIsModalActive(true)} />
      <Modal>
        <Settings hideSettings={() => setIsModalActive(false)} />
      </Modal>

      <PrintableWrapper>
        <ResumeContainer id="container" {...state}>
          <h1>John Sloat</h1>

          <Contact />

          {getRolesData().map(({ sectionHeader, roles }) => (
            <React.Fragment key={sectionHeader.text}>
              <SectionHeader {...sectionHeader} />
              <RolesContainer>
                {roles.map(role => (
                  <Role {...role} key={role.title} />
                ))}
              </RolesContainer>
            </React.Fragment>
          ))}

          <Source>
            View résumé source on{" "}
            <a href="https://github.com/jsloat/jsloat.github.io/tree/master/src/Resume">
              Github
            </a>
          </Source>
        </ResumeContainer>
      </PrintableWrapper>
    </ResumeContext.Provider>
  );
};

export default Resume;
