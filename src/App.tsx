import React from "react";
import { Link, Route, Routes } from "react-router-dom";

const App = () => (
  <>
    <div>
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
    </div>
    <Routes>
      <Route path="/" element={"home"} />
      <Route path="/a" element={"a"} />
      <Route path="/b" element={"b"} />
      <Route path="/c" element={"c"} />
    </Routes>
  </>
);

export default App;
