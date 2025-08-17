import React from "react";
import { Route, Routes } from "react-router-dom";
import ColorPalette from "./ColorPalette";
import ScriptableUtils from "./ScriptableUtils";
import GlobalStyle from "./GlobalStyle";
import Resume from "./Resume";
import TOCCreator from "./TOCCreator";
import PocketCal from "./PocketCal";

const App = () => (
  <>
    <GlobalStyle />
    <Routes>
      <Route path="/" element={<Resume />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/colors" element={<ColorPalette />} />
      <Route path="/scriptable-utils/*" element={<ScriptableUtils />} />
      <Route path="/toc-creator" element={<TOCCreator />} />
      <Route path="/pocket-cal" element={<PocketCal />} />
    </Routes>
  </>
);

export default App;
