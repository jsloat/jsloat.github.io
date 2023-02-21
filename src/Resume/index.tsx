import React, { useReducer } from "react";
import { boxShadow, CONTAINER_PADDING } from "src/consts";
import { useModal } from "src/Modal";
import { useTitle } from "src/utils";
import styled, { css } from "styled-components/macro";
import { getMobileCSS, SectionHeader } from "./atoms";
import Contact from "./Contact";
import { defaultResumeState, ResumeContext } from "./ResumeContext";
import Role from "./Role";
import rolesData from "./rolesData";
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
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      line-height: 1.4em;
    }
  }
`;

const Container = styled.div`
  max-width: 800px;
  background-color: white;
  margin: 75px auto;
  padding: ${CONTAINER_PADDING.NORMAL};
  ${boxShadow}
  ${getMobileCSS(css`
    max-width: 100%;
    margin: 0;
    padding: ${CONTAINER_PADDING.MOBILE};
  `)}
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

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      <SettingsToggle showSettings={() => setIsModalActive(true)} />
      <Modal>
        <Settings hideSettings={() => setIsModalActive(false)} />
      </Modal>

      <PrintableWrapper>
        <Container id="container">
          <h1>John Sloat</h1>

          <Contact />

          {rolesData.map(({ sectionHeader, roles }) => (
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
        </Container>
      </PrintableWrapper>
    </ResumeContext.Provider>
  );
};

export default Resume;
