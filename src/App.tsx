import React from "react";
import { Route, Routes } from "react-router-dom";
import ColorPalette from "./ColorPalette";
import GlobalStyle from "./GlobalStyle";
import Resume from "./Resume";

const App = () => (
  <>
    <GlobalStyle />
    <Routes>
      <Route path="/" element={<Resume />} />
      <Route path="/a" element={"a"} />
      <Route path="/b" element={"b"} />
      <Route path="/c" element={"c"} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/colors" element={<ColorPalette />} />
    </Routes>
  </>
);

export default App;
