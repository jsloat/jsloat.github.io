# Introduction

[Scriptable](https://scriptable.app/) is a wonderful iOS/iPadOS app that provides a JavaScript IDE and access to system APIs like reminders, calendar, and notifications. Although it works great out-of-the-box, this set of guides will walk you through setting up a more mature environment that will enable you to quickly create interactive applications.

| INFO: This guide assumes you're using a Mac. Most of the information is still relevant without it, but you will not be able to automatically sync your built Scriptable files via iCloud sync. |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

| INFO: This guide assumes a basic understanding of JavaScript and TypeScript, and familiarity with the code editor of choice. |
| ---------------------------------------------------------------------------------------------------------------------------- |

## Benefits of this setup

### More robust development workflow

While you can choose to edit files directly in Scriptable, or in an editor on your computer (in the synced iCloud directory), this method introduces some powerful benefits:

#### Typescript

Whether or not this is a benefit depends on who you ask, but in my experience, using TypeScript leads to dramatically fewer issues with your code.

It also enables you to use the [@types/scriptable-ios](https://www.npmjs.com/package/@types/scriptable-ios) package, an auto-generated set of type declarations based on the official Scriptable documentation. With this and TypeScript installed, you get IDE auto-completion & type checking for custom Scriptable APIs like `Reminder`, which saves time spent referencing the documentation, and prevents mistakes.

#### Minified builds

When I first started with Scriptable, I used Scriptable's `importModule` to import utils from other Scriptable files. I ended up with something like 50 Scriptable files, which became tedious to manage.

Instead, I now can have hundreds of TypeScript files, well organized and easy to read, and everything is combined and minified with [rollup.js](https://rollupjs.org/) into a single file per Scriptable script. One big benefit of this approach is that all the code each script needs is self-contained, and iCloud sync-related issues become much less burdensome.

### Powerful wrappers for Scriptable classes & APIs

I've spent a lot of time building [scriptable-utils](https://www.npmjs.com/package/scriptable-utils), which contains a bunch of utilities to make it easier to build interactive elements and use iOS API bridges in Scriptable.

My development experience is primarily with React & RxJS; if you're familiar with these libraries, you'll notice a lot of inspiration taken from them.

Some examples:

#### getTable

Creates a `UITable` with optional state and props. Calling this function returns utilities for working with the table, e.g.:

- `present` - Presents the table. The return value of this function is `Promise<State>` (i.e. if your table has state, the final state is returned).
- `connect` - A helper function for composing components used in the table.
- `isTableActive` - A function to check whether the table is currently active.

#### UITable components

A number of premade components you can use for table layout. These components, and any table generated using `getTable`, have appropriate light mode/dark mode styling.

Some examples:

- `Button`
- `DetailCard`
- `H1`, `H2`
- `Span`
- `P` (paragraph)
- `ProgressBar`
- `Table` (table inception)
- `Toast` (notification banners)

#### User input components

Many of these are just wrappers on top of the input options available in Scriptable (e.g. different flavors of the `Alert` class), and some are `UITable`s.

Some examples:

- `form` - A form component that supports validation and 13 field types. The form fields are also available for individual use (e.g. `DropdownField`).
- `confirm` - Dialog to prompt user to confirm an action
- `OK` - Simple dialog to acknowledge a message
- `listChoose` - Fullscreen option selection
- `textArea` - Fullscreen text input box
- `textInput` - Regular text input
