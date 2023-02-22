import React from "react";
import settingsIcon from "../../assets/settings.svg";
import styled from "styled-components/macro";

const SettingsToggleContainer = styled.div`
  position: fixed;
  top: 1em;
  right: 1em;
  @media print {
    display: none;
  }
`;

const TOGGLE_BUTTON_HEIGHT = "20px";

const SettingsToggleButton = styled.div`
  background-color: rgb(0 0 0 / 5%);
  backdrop-filter: blur(1.5px);
  border: 0;
  cursor: pointer;
  width: ${TOGGLE_BUTTON_HEIGHT};
  height: ${TOGGLE_BUTTON_HEIGHT};
  padding: 1em;
  > img {
    width: ${TOGGLE_BUTTON_HEIGHT};
  }
  border: 1px solid transparent;
  border-radius: 28px;
  transition: border-color 0.3s ease;
  user-select: none;
  &:hover {
    border: 1px solid black;
  }
`;

type ToggleProps = { showSettings: () => void };

export const SettingsToggle = ({ showSettings }: ToggleProps) => (
  <SettingsToggleContainer>
    <SettingsToggleButton onClick={showSettings}>
      <img src={settingsIcon} alt="Settings icon" />
    </SettingsToggleButton>
  </SettingsToggleContainer>
);
