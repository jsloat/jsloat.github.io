import { createGlobalStyle } from "styled-components/macro";
import { BASE_FONT_SIZE, SLATE_300, SLATE_900 } from "./consts";

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
  background-color: ${SLATE_300};
  color: ${SLATE_900}
}

h1, h2, h3, h4 {
  font-weight: 300;
  margin: 0;
  display: inline-block;
}

h1 {
  font-weight: 300;
  margin: 0;
  font-size: 2.5em;
}

h2 {
  font-size: 1.8em;
}

h3 {
  font-size: 1.3em;
}

a {
  color: ${SLATE_900};
  font-weight: 400
}

a:hover {
}
`;
