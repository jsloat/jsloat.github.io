import { createGlobalStyle, css } from "styled-components/macro";
import { BASE_FONT_SIZE, colors } from "./consts";
import { getMobileCSS } from "./Resume/atoms";

export default createGlobalStyle`
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: ${BASE_FONT_SIZE};
  font-weight: 300;
  background-color: ${colors.slate[300]};
  color: ${colors.slate[900]};
  line-height: 1.5em;
  ${getMobileCSS(
    css`
      font-size: 16px;
    `
  )}
  @media print {
    body {
      width: 8.5in;
      height: 11in;
      color: black;
    }
  }
}

h1, h2, h3, h4 {
  font-weight: 300;
  margin: 0;
  display: inline-block;
  line-height: 1em;
}

h1 {
  font-weight: 300;
  margin: 0;
  font-size: 2.5em;
  letter-spacing: .010em;
}

h2 {
  font-size: 1.8em;
  letter-spacing: .015em;
  @media print {
    font-size: 1.5em;
  }
}

h3 {
  font-size: 1.3em;
  @media print {
    font-size: 1.2em;
  }
}

a {
  color: ${colors.slate[900]};
  font-weight: 400
}

a:hover {
}
`;
