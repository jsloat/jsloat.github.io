# Sample files

Almost done! Now, let's add some sample entry files that we can use to test out the setup.

## Storybook

First, a simple one. Create `/src/entry/storybook.ts` with the following contents:

```
import { storybook } from "scriptable-utils";

(async () => await storybook())();
```

`storybook` is a simple script I created to showcase some of the components and utilities available in `scriptable-utils`.

The only really notable thing here is that line 3 is wrapped in an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) — if you were to simply write `await storybook()` instead, the linter would probably complain about "top-level await", even though this is totally fine in Scriptable scripts. I use this format in most of my entry files.

Run `npm run b storybook` in the terminal, and you should (if you set up this directory beneath Scriptable) shortly see a new script called storybook in the Scriptable app.

If not...one of us made a mistake. Feel free to [file an issue here](https://github.com/jsloat/jsloat.github.io/issues/new) if you get stuck.

## Hello world

Now we'll write our own simple script that shows a `UITable` with a single state variable.

Create `/src/entry/helloWorld.ts` with the following contents:

```
import { Button, Div, getTable, H1, P, Spacer, Table } from "scriptable-utils";

type State = { toneOfVoice: "friendly" | "off-putting" };

const { present, connect, setState } = getTable<State>({
  name: "Example table",
});

const Title = connect(({ state: { toneOfVoice } }) =>
  H1(toneOfVoice === "friendly" ? "Hello world!" : "What do you want")
);

const ToggleToneOfVoice = connect(({ state: { toneOfVoice } }) =>
  Button({
    text:
      toneOfVoice === "friendly"
        ? "Try another tone of voice!"
        : "Ugh, fine, click me",
    icon: "cycle",
    flavor: "primary",
    onTap: () =>
      setState({
        toneOfVoice: toneOfVoice === "friendly" ? "off-putting" : "friendly",
      }),
  })
);

const LoremIpsum = connect(({ state: { toneOfVoice } }) =>
  Div(
    [
      P(
        toneOfVoice === "friendly"
          ? "Well hello there! Thanks for stopping by, this is my table, would you like to take a seat?"
          : "Everyone always clicks me. I don't like it. Would you like it if I walked up to you and clicked you?"
      ),
    ],
    { height: 100 }
  )
);

const StateTable = connect(({ state: { toneOfVoice } }) =>
  Table({
    columns: { key: { isRowValueBold: true }, val: {} },
    rows: [
      { cellValues: { key: "Tone of voice", val: toneOfVoice } },
      {
        cellValues: {
          key: "Mood",
          val: toneOfVoice === "friendly" ? "Excited!" : "Disillusioned",
        },
      },
    ],
    hideColumnNames: true,
  })
);

present({
  defaultState: { toneOfVoice: "friendly" },
  render: () => [
    Title(),
    ToggleToneOfVoice(),
    Spacer(),
    StateTable(),
    LoremIpsum(),
  ],
});
```

Run `npm run b helloWorld` as above and see what happens.

## Bye now

In future guides, I'll provide some more guidance on how to use all the utils available in `scriptable-utils`, but for now, reach out [via GitHub](https://github.com/jsloat/jsloat.github.io/issues/new) with any questions.

Thanks for following along!
