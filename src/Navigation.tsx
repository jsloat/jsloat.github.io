import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HideFromPrint = styled.div`
  @media print {
    display: none;
  }
`;

const Navigation = () => (
  <HideFromPrint>
    <div>
      <b>
        <Link to="/a">Route A</Link>
        <br />
        <Link to="/b">Route B</Link>
        <br />
        <Link to="/c">Route C</Link>
        <br />
        <br />
      </b>
    </div>
  </HideFromPrint>
);

export default Navigation;
