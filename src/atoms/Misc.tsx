import { CONTAINER_PADDING } from "src/consts";
import { getMobileCSS } from "src/Resume/atoms";
import styled, { css } from "styled-components/macro";

export const BaseContainer = styled.div`
  max-width: 800px;
  background-color: white;
  margin: 0 auto;
  padding: ${CONTAINER_PADDING.NORMAL};
  ${getMobileCSS(css`
    max-width: 100%;
    margin: 0;
    padding: ${CONTAINER_PADDING.MOBILE};
  `)}
`;
