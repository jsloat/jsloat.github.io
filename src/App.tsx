import React from "react";
import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import { topLevelRoutes } from "./topLevelRoutes";

const App = () => (
  <>
    <GlobalStyle />
    <Routes>
      {topLevelRoutes.map(({ route, element }) => (
        <Route
          key={route}
          path={route}
          element={React.createElement(element)}
        />
      ))}
    </Routes>
  </>
);

export default App;
