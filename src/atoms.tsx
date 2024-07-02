import styled, { css } from "styled-components/macro";

export const PrintableWrapper = styled.div`
  @page {
    size: auto;
    margin: 0;
  }
  @media print {
    #container {
      padding: 0.25in 0.5in;
      margin: 0;
    }
  }
`;

export const HideWhenPrinting = styled.div<{ hide?: boolean }>`
  ${({ hide }) =>
    hide !== false &&
    css`
      @media print {
        display: none;
      }
    `}
`;
