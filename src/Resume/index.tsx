import React from "react";
import { CONTAINER_PADDING } from "src/consts";
import { useTitle } from "src/utils";
import styled, { css } from "styled-components/macro";
import { getMobileCSS, SectionHeader } from "./atoms";
import Contact from "./Contact";
import Role from "./Role";
import rolesData from "./rolesData";

const PrintableWrapper = styled.div`
  @page {
    size: auto;
    margin: 0mm;
  }
  @media print {
    #container {
      font-size: 12px;
      padding: 0.5in;
      margin: 0;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      line-height: 1.5em;
    }
  }
`;

const Container = styled.div`
  max-width: 800px;
  background-color: white;
  margin: 75px auto;
  padding: ${CONTAINER_PADDING.NORMAL};
  -webkit-box-shadow: 3px 3px 6px 0px rgb(170 170 170 / 75%);
  -moz-box-shadow: 3px 3px 6px 0px rgb(170 170 170 / 75%);
  box-shadow: 3px 3px 6px 0px rgb(170 170 170 / 75%);
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
`;

const Source = styled.div`
  font-size: 0.8em;
  font-style: italic;
  text-align: center;
  margin-top: 3em;
`;

const Resume = () => {
  useTitle("John Sloat's Résumé");
  return (
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
          View résumé source at{" "}
          <a href="https://github.com/jsloat/jsloat.github.io">
            github.com/jsloat/jsloat.github.io
          </a>
        </Source>
      </Container>
    </PrintableWrapper>
  );
};

export default Resume;
