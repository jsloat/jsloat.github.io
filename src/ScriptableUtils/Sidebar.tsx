import React from "react";
import { Link } from "react-router-dom";
import { colors } from "src/consts";
import styled, { css } from "styled-components/macro";
import { containerPadding } from "./consts";
import routeMetadata, {
  areRoutesEqual,
  DEFAULT_ROUTE,
  ScriptableRoute,
} from "./routeMetadata";
import { isRootScriptablePath } from "./utils";

type SidebarProps = { routePath: string };

const Sidebar = styled.div`
  width: 300px;
  background-color: ${colors.slate[50]};
  ${containerPadding}
  padding-right: 0;
  border-right: 1px solid ${colors.slate[300]};
  a {
    text-decoration: none;
  }
`;

const NAV_ITEM_LR_PADDING = "16px";

const NavSection = styled.div`
  color: ${colors.slate[500]};
  padding-left: ${NAV_ITEM_LR_PADDING};
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.7em;
  margin-top: 2em;
`;

type NavItemProps = { isSelected?: boolean };
const NavItem = styled.div<NavItemProps>`
  cursor: pointer;
  user-select: none;
  padding: 0.4em ${NAV_ITEM_LR_PADDING};
  border-radius: 6px 0 0 6px;
  font-size: 0.9em;
  margin-bottom: 0.2em;
  transition: background-color 0.4s cubic-bezier(0, 0, 0, 1);
  font-weight: 300;
  ${({ isSelected }) =>
    isSelected
      ? css`
          background-color: ${colors.slate[200]};
          color: ${colors.pink[600]};
          font-weight: 500;
        `
      : css`
          &:hover {
            background-color: ${colors.slate[100]};
          }
        `}
`;

type LinkedNavItemProps = SidebarProps & { route: ScriptableRoute };
const LinkedNavItem = ({ route, routePath }: LinkedNavItemProps) => (
  <Link to={route.routePath}>
    <NavItem
      isSelected={
        routePath === route.routePath ||
        (areRoutesEqual(route, DEFAULT_ROUTE) &&
          isRootScriptablePath(routePath))
      }
    >
      {route.label}
    </NavItem>
  </Link>
);

const NavContent = ({ routePath }: SidebarProps) => (
  <>
    {routeMetadata.map(({ sectionHeader, routes }, i) => (
      <React.Fragment key={`nav_${i}`}>
        {sectionHeader && <NavSection>{sectionHeader}</NavSection>}
        {routes.map((route, j) => (
          <LinkedNavItem
            route={route}
            routePath={routePath}
            key={`nav_${i}_${j}`}
          />
        ))}
      </React.Fragment>
    ))}
  </>
);

export default ({ routePath }: SidebarProps) => (
  <Sidebar>
    <NavContent routePath={routePath} />
  </Sidebar>
);
