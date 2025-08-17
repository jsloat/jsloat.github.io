import ColorPalette from "./ColorPalette";
import Home from "./Home";
import PocketCal from "./PocketCal";
import Resume from "./Resume";
import ScriptableUtils from "./ScriptableUtils";
import TOCCreator from "./TOCCreator";

type Route = {
  label: string;
  route: string;
  element: () => JSX.Element;
};

export const topLevelRoutes: Route[] = [
  {
    label: "Home",
    route: "/",
    element: Home,
  },

  {
    label: "Resume",
    route: "/resume",
    element: Resume,
  },

  {
    label: "Colors",
    route: "/colors",
    element: ColorPalette,
  },

  {
    label: "Scriptable Utils",
    route: "/scriptable-utils/*",
    element: ScriptableUtils,
  },

  {
    label: "TOC Creator",
    route: "/toc-creator",
    element: TOCCreator,
  },

  {
    label: "Pocket Cal",
    route: "/pocket-cal",
    element: PocketCal,
  },
];
