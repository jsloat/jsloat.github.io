# Project overview

This repository hosts a personal website built with Create React App (React + TypeScript). It contains several feature areas under `src/` (Home, Resume, ScriptableUtils, TOCCreator, PocketCal, etc.), uses `styled-components` for styling, and is deployed to GitHub Pages via the `gh-pages` package.

## Important files & layout

- `package.json` — scripts & deps. Use these scripts for automation (start, build, test, deploy).
- `tsconfig.json` — TypeScript configuration.
- `src/index.tsx`, `src/App.tsx` — top-level app wiring and routing.
- `src/ColorPalette.tsx`, `src/GlobalStyle.ts` — theming and global styles.
- `src/atoms/` and `src/atoms.tsx` — small shared UI components.
- `src/<feature>/` — feature folders (Home, Resume, ScriptableUtils, TOCCreator, PocketCal, etc.).
- `public/` and `build/` — static assets and built output.

## Coding & review conventions

- Use TypeScript (add types for public component props where reasonable).
- Prefer React functional components with hooks.
- Use `styled-components` for component styles and keep styling colocated with the component.
- Avoid large refactors without prior discussion.
- Avoid adding run-time dependencies without approval; small dev dependencies are OK if justified.
- Preserve existing print/layout units and conventions (e.g. mm units) when editing print-related components.
- Put exported components/functions near the top of the file, with small utils or helper functions below.

## Commit message guidance

- Use a short imperative subject, e.g. `Add graph-dot notes module`.
- Make note of the features affected by the change.
- Only add a commit body if there are necessary details (e.g. if there are multiple, disparate changes that should be itemized).

## When instructions are ambiguous

- Propose 1–2 reasonable defaults and implement the least-surprising option.
- Ask the user only if the decision materially affects APIs, data formats, or deployment.

## Owner preferences

- Prefers concise patches, clear commit messages, and fast iteration.
- Favor readability and maintainability over clever hacks.

## Notes for the agent

- Treat this file as authoritative for repository-specific rules and validation commands.
- Only perform repo-wide searches if the instructions do not cover a requested task.
- Keep instructions short and general-purpose — avoid task-specific workflows in this file.
- When you receive feedback that either runs counter to these instructions or is not covered here, update this file with the new guidance.
