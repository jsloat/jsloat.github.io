import React from "react";
import { BaseContainer } from "src/atoms/Misc";
import { topLevelRoutes } from "src/topLevelRoutes";

export default () => (
  <BaseContainer>
    <h2>sloat.life</h2>
    <ul>
      {topLevelRoutes.map(({ label, route }) => {
        const parsedRoute = parseRoute(route);
        if (!parsedRoute) return null;
        return (
          <li key={route}>
            <a href={parsedRoute} target="_self">
              {label}
            </a>
          </li>
        );
      })}
    </ul>
  </BaseContainer>
);

const parseRoute = (route: string) => {
  if (route === "/") return null;

  let modifiedRoute = route;
  if (route.endsWith("/*")) modifiedRoute = route.slice(0, -2);

  return `/#${modifiedRoute}`;
};
