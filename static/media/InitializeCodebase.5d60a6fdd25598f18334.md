# Initialize repository

All of the files in the next few pages are available [in this GitHub repo](https://github.com/jsloat/scriptable-in-ts-starter) if you'd like to just dive in.

| INFO: Prerequisite: npm should be installed globally |
| ---------------------------------------------------- |

## Initialize package

Run the following in the terminal, in the "Dropbox" (or similar) directory:

```
npm init
```

This creates a `package.json` file where you can manage npm packages and build scripts.

## Initialize git (optional)

| INFO: Prerequisite: git installed globally |
| ------------------------------------------ |

If you'd like to track the changes in your codebase (I recommend it), run this to initialize git:

```
git init
```

### .gitignore

Create a file in the root directory called `.gitignore` with the following contents:

```
node_modules
yarn-error.log
```

## Install the required dependencies

Running the following command in the terminal will install the packages needed for this setup:

```
npm install --save-dev typescript tslib rollup @rollup/plugin-terser @rollup/plugin-node-resolve @rollup/plugin-typescript @types/node @types/scriptable-ios scriptable-utils
```

What are all of these packages?

- **typescript** and **tslib** for TypeScript support
- **rollup** for code building and minification
  - **@rollup/plugin-terser** to minify code
  - **@rollup/plugin-node-resolve** so imports from node packages get bundled during the rollup build
  - **@rollup/plugin-typescript** to compile from TypeScript to JavaScript
- **@types/node** and **@types/scriptable-ios** are the type definitions for node & Scriptable respectively
- And **scriptable-utils** is my set of utils that we'll dig into during this guide

## Add src directories

Create directory `src` at root, then within `src`, create directory `entry`.

`src` will store all of your application code, and files in `entry` will be buildable (i.e. these files will map 1-1 with the scripts that show up in the Scriptable app).

## Add tsconfig

Add `tsconfig.json` at root. This file will dictate the rules that are enforced by TypeScript.

Put the following in that file:

```
{
  "compilerOptions": {
    "target": "ESNext",
    "moduleResolution": "node",
    "noEmit": true,
    "strict": true,
    "noImplicitAny": true,
    "allowSyntheticDefaultImports": true,
    "noUnusedLocals": true,
    "lib": ["ESNext"],
    "baseUrl": "src",
    "noUncheckedIndexedAccess": true,
    "allowUnreachableCode": false,
    "noImplicitReturns": false,
    "strictFunctionTypes": true,
    "noErrorTruncation": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts", "./*.ts"],
  "exclude": ["node_modules"]
}
```

## You should see...

Your Scriptable directory should look like this:

![](scriptable-setup-initialize-repo-1.png)

(`.gitignore` may be hidden in the filesystem, as seen above)
