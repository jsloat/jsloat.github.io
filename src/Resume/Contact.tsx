import React from "react";
import styled, { css } from "styled-components/macro";
import linkedinLogo from "../assets/linkedin.svg";
import githubLogo from "../assets/github.svg";
import { getMobileCSS } from "./atoms";

const FONT_SIZE = "1.2em";

const ContactContainer = styled.div`
  display: flex;
  gap: 35px;
  margin: 0.5em 0;
  ${getMobileCSS(css`
    flex-wrap: wrap;
    row-gap: 0.5em;
    justify-content: space-between;
  `)}
`;

const TextAndImgContainer = styled.div`
  display: flex;
  height: ${FONT_SIZE};
  align-items: center;
  gap: 7px;
  cursor: pointer;
  font-size: ${FONT_SIZE};
  img {
    height: ${FONT_SIZE};
  }
`;

const ContactItemAnchor = styled.a`
  text-decoration: none;
`;

type ContactItemProps = {
  text: string;
  href: string;
  imageSrc?: string;
};
const ContactItem = ({ text, href, imageSrc }: ContactItemProps) => (
  <ContactItemAnchor href={href}>
    <TextAndImgContainer>
      {imageSrc && <img src={imageSrc} />}
      {text}
    </TextAndImgContainer>
  </ContactItemAnchor>
);

const Contact = () => (
  <ContactContainer>
    <ContactItem text="jsloat1@gmail.com" href="mailto:jsloat1@gmail.com" />
    <ContactItem text="(425) 500-3445" href="tel://+14255003445" />
    <ContactItem
      text="/jsloat"
      href="https://www.linkedin.com/in/jsloat"
      imageSrc={linkedinLogo}
    />
    <ContactItem
      text="/jsloat"
      href="https://github.com/jsloat"
      imageSrc={githubLogo}
    />
  </ContactContainer>
);

export default Contact;
