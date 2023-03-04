# Build scripts

## Shell scripts

Add file `build.sh` to root, with the following contents:

```
#!/usr/bin/env bash

has_param() {
  local term="$1"
  shift
  for arg; do
    if [[ $arg == "$term" ]]; then return 0; fi
  done
  return 1
}

# First argument is filepath (or filename, without extension)
#
# Supported flags:
#  --watch: Rebuild automatically when changes are detected
build() {
  local entry_file_path=$1
  local parsed_path
  if [[ $entry_file_path == ./src/* ]]; then
    parsed_path=$entry_file_path
  else
    parsed_path=./src/entry/$entry_file_path.ts
  fi
  local cmd
  cmd="rollup --config rollup.config.ts --environment file_path:$parsed_path --configPlugin @rollup/plugin-typescript"
  if has_param '--watch' "$@"; then cmd+=' --watch'; fi
  $cmd
}

build_and_watch() {
  build "$1" --watch
}
```

Without getting into too much detail, these 2 scripts (`build` and `build_and_watch`) take a filename or filepath as input, and build that file as described in the previous section.

## Adding shortcuts in package.json

Next we'll add shortcuts to run these build scripts easily from the console.

In `package.json`, add the following:

```
"scripts": {
  "b": "source ./build.sh; build",
  "bw": "source ./build.sh; build_and_watch"
},
```

I've used shorthand here for less typing (`b` for build & `bw` for build & watch), but you can call them whatever you like.

The whole `package.json` file should now look something like this:

```
{
  "name": "tmp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "b": "source ./build.sh; build",
    "bw": "source ./build.sh; build_and_watch"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@rollup/plugin-node-resolve": "^15.0.1",
    "@rollup/plugin-terser": "^0.4.0",
    "@rollup/plugin-typescript": "^11.0.0",
    "@types/node": "^18.14.2",
    "@types/scriptable-ios": "^1.7.0",
    "rollup": "^2.79.1",
    "scriptable-utils": "^1.0.37",
    "tslib": "^2.5.0",
    "typescript": "^4.9.5"
  }
}
```

We'll see how to use these build scripts in the next and final section.

## You should see...

Your Scriptable directory should now look like this:

![](scriptable-setup-build-scripts-1.png)
