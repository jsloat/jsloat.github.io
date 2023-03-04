import Introduction from "./markdown/Introduction.md";
import Why from "./markdown/Why.md";
import SetUpTheDropboxDirectory from "./markdown/setup/SetUpTheDropboxDirectory.md";
import InitializeCodebase from "./markdown/setup/InitializeCodebase.md";
import RollupPluginForScriptableSettings from "./markdown/setup/RollupPluginForScriptableSettings.md";
import RollupConfiguration from "./markdown/setup/RollupConfiguration.md";
import BuildScripts from "./markdown/setup/BuildScripts.md";
import SampleFiles from "./markdown/setup/SampleFiles.md";
import { isRootScriptablePath } from "./utils";

export type ScriptableRoute = {
  routePath: string;
  markdownPath: string;
  label: string;
};

type RouteMetadata = {
  sectionHeader: string | null;
  routes: ScriptableRoute[];
};

export const areRoutesEqual = (a: ScriptableRoute, b: ScriptableRoute) =>
  a.routePath === b.routePath;

const pathPrefix = (path: string) => `/scriptable-utils/${path}`;

export const DEFAULT_ROUTE: ScriptableRoute = {
  label: "Introduction",
  routePath: pathPrefix("introduction"),
  markdownPath: Introduction,
};

const routeMetadata: RouteMetadata[] = [
  {
    sectionHeader: null,
    routes: [
      DEFAULT_ROUTE,
      { label: "Why?", markdownPath: Why, routePath: pathPrefix("why") },
    ],
  },

  {
    sectionHeader: "Setup",
    routes: [
      {
        label: "Set up the Dropbox directory",
        markdownPath: SetUpTheDropboxDirectory,
        routePath: pathPrefix("setup/dropbox-directory"),
      },
      {
        label: "Initialize repository",
        markdownPath: InitializeCodebase,
        routePath: pathPrefix("setup/initialize-repo"),
      },
      {
        label: "Rollup plugin for Scriptable settings",
        markdownPath: RollupPluginForScriptableSettings,
        routePath: pathPrefix("setup/rollup-plugin"),
      },
      {
        label: "Rollup configuration",
        markdownPath: RollupConfiguration,
        routePath: pathPrefix("setup/rollup-configuration"),
      },
      {
        label: "Build scripts",
        markdownPath: BuildScripts,
        routePath: pathPrefix("setup/build-scripts"),
      },
      {
        label: "Sample files",
        markdownPath: SampleFiles,
        routePath: pathPrefix("setup/sample-files"),
      },
    ],
  },
];

/** Given the route path (e.g. "/scriptable/introduction"), find the
 * corresponding ScriptableRoute */
export const findScriptableRoute = (routePath: string) => {
  if (isRootScriptablePath(routePath)) return DEFAULT_ROUTE;
  return routeMetadata
    .flatMap(({ routes }) => routes)
    .find(route => route.routePath === routePath);
};

export default routeMetadata;
