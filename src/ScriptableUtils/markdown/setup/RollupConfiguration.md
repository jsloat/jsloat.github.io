# Rollup configuration

Now we'll instruct rollup how to turn our TypeScript into minified Scriptable scripts.

Create `rollup.config.ts` at root with the following contents:

```
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import addFileIconSettings from "./rollup-plugin-add-file-icon-settings";

// https://github.com/rollup/rollup/issues/703#issuecomment-224984436 <-- passing args into config file
const ENTRY_FILE_PATH = process.env.file_path;

const config = {
  input: ENTRY_FILE_PATH,
  output: {
    dir: "..",
    format: "es",
    plugins: [terser()],
  },
  plugins: [typescript(), nodeResolve(), addFileIconSettings(ENTRY_FILE_PATH!)],
  watch: {
    include: "src/**",
  },
};

// ts-unused-exports:disable-next-line
export default [config];
```

## Explanation

### Entry file path

```
const ENTRY_FILE_PATH = process.env.file_path;
...
input: ENTRY_FILE_PATH,
```

In the build script, we'll pass the entry filepath that we want to build to rollup, which it reads here.

### Output

```
dir: "..",
...
plugins: [terser()],
```

The built files will be placed into the parent directory — if you've followed the previous steps in this guide, that should be the Scriptable folder. This means that after they're built, the scripts are immediately (err...whenever iCloud gets around to it) updated in the app.

And the `terser` plugin takes care of minimization.

### Plugins

```
plugins: [typescript(), nodeResolve(), addFileIconSettings(ENTRY_FILE_PATH!)],
```

Here we tell rollup to compile from typescript, resolve nod modules, and add our custom comment at the top of the built file.

### Watch

```
watch: {
  include: "src/**",
},
```

This tells rollup which files to watch (when building with the optional watch flag). More on this in the next section.
