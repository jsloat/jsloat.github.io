# Rollup plugin for Scriptable settings

At the top of every Scriptable file, Scriptable inserts comment lines that look something like this:

```
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: home;
```

The first 2 lines are static, and the 3rd (and optional 4th) determine some of the script settings, its icon, and its color.

Since we're creating a new script every time we build, the old comment gets overwritten, and in that case, Scriptable automatically prepends some arbritrary icon and color to the script.

So, after the script has been compiled and minified, we need to also prepend our own comment if we want a consistent appearance for our scripts.

## The settings file

First, we'll create a file where we can add script settings. Add `scriptIconSettings.ts` to the directory with the following contents:

```
type IconColor =
  | "blue"
  | "red"
  | "gray"
  | "deep-gray"
  | "yellow"
  | "light-gray"
  | "cyan"
  | "deep-green"
  | "green"
  | "deep-blue"
  | "purple"
  | "pink";

export type ScriptSettings = {
  iconColor: IconColor;
  iconGlyph: string;
  alwaysRunInApp?: true;
};

type SettingsGroup = Record<string, ScriptSettings>;

export const SETTINGS: SettingsGroup = {
  helloWorld: { iconColor: "blue", iconGlyph: "eye" },
  storybook: { iconColor: "pink", iconGlyph: "palette" },
};
```

NB: the colors in `IconColor` are not exhaustive (Scriptable supports more than this).

I won't go into detail about these settings, since they're explained in the Scriptable app.

For both `iconColor` and `iconGlyph`, you can use Scriptable to select what you like, then look at the comment at the top of the Scriptable file to derive the values to use.

`SETTINGS` is a map from script name to settings – ignore the script names for now, we'll implement them later. The takeaway is that this file is where you define script settings.

## The rollup plugin

Next, we'll add a very simple plugin for rollup that will do the following:

- When building a script, look in `scriptIconSettings.ts` for script settings.
- If there are no settings defined, use a fallback setting.
- Prepend the Scriptable settings comment block at the top of the minified script.

Create a file called `rollup-plugin-add-file-icon-settings.ts` with the following contents:

```
import { Plugin } from "rollup";
import { ScriptSettings, SETTINGS } from "./scriptIconSettings";

const COMMENT_ATOMS = {
  line1: "Variables used by Scriptable.",
  line2: "These must be at the very top of the file. Do not edit.",
  runInApp: "always-run-in-app: true;",
};

const getScriptableSettingsCommentLines = ({
  iconColor,
  iconGlyph,
  alwaysRunInApp,
}: ScriptSettings) => {
  const colorAtom = `icon-color: ${iconColor};`;
  const iconAtom = `icon-glyph: ${iconGlyph};`;
  const line3 = alwaysRunInApp
    ? [COMMENT_ATOMS.runInApp, colorAtom]
    : [colorAtom, iconAtom];
  const line4 = alwaysRunInApp ? iconAtom : null;
  return [COMMENT_ATOMS.line1, COMMENT_ATOMS.line2, line3.join(" "), line4]
    .filter(Boolean)
    .map(text => `// ${text}`)
    .join("\n");
};

const fallbackIconSettings: ScriptSettings = {
  alwaysRunInApp: true,
  iconColor: "yellow",
  iconGlyph: "exclamation-triangle",
};

const getBannerForFilePath = (filePath: string) => {
  const matchForTsFiles = filePath.match(/.*\/([a-z0-9\.]+)\.ts/i);
  if (!matchForTsFiles?.[1]) return null;
  const filename = matchForTsFiles[1];

  const settingsForFile = SETTINGS[filename];
  if (settingsForFile) {
    return getScriptableSettingsCommentLines(settingsForFile);
  }
  const DIVIDER = "-".repeat(50);
  // eslint-disable-next-line no-console
  console.log(
    ["", DIVIDER, `Missing settings for ${filename}!`, DIVIDER, ""].join("\n")
  );
  return getScriptableSettingsCommentLines(fallbackIconSettings);
};

//

const addFileIconSettings = (filePath: string): Plugin => ({
  name: "rollup-plugin-scriptable-icon-settings",
  renderChunk: code => {
    const commentLines = getBannerForFilePath(filePath);
    return commentLines ? [commentLines, code].join("\n") : code;
  },
});

export default addFileIconSettings;
```

We'll use this in the next step when we configure rollup.
