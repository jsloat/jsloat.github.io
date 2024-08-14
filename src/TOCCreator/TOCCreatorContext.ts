import { Dispatch, createContext, useContext } from "react";
import { TOCCreatorState, TOCEntry, TOCTag } from "./types";
import { mockDataFreetext } from "./mockData";

export const defaultTOCCreatorState: TOCCreatorState = {
  entries: [],
  tags: [],
  title: null,
  freehandText: mockDataFreetext,
};

type Action = Identity<TOCCreatorState>;

type Context = { state: TOCCreatorState; dispatch: Dispatch<Action> };

export const TOCCreatorContext = createContext<Context>({
  state: defaultTOCCreatorState,
  dispatch: () => {},
});

export const useTOCCreatorContext = () => useContext(TOCCreatorContext);

//

const actionCreator =
  <A extends any[]>(
    reducer: (state: TOCCreatorState, ...args: A) => TOCCreatorState
  ) =>
  (...args: A): Action =>
  (state) =>
    reducer(state, ...args);

export const actions = {
  // Title

  setTitle: actionCreator((state, newTitle: string) => ({
    ...state,
    title: newTitle || null,
  })),

  // Tags

  createTag: actionCreator((state, text: string) => ({
    ...state,
    tags: state.tags.concat({ text, index: state.tags.length }),
  })),

  updateTag: actionCreator((state, tagIndex: number, newText: string) => ({
    ...state,
    tags: state.tags.map((tag) =>
      tag.index === tagIndex && newText ? { ...tag, text: newText } : tag
    ),
  })),

  deleteTag: actionCreator((state, tagIndex: number) => {
    const withoutTag = (tag: TOCTag) => tag.index !== tagIndex;
    return {
      ...state,
      tags: state.tags.filter(withoutTag),
      entries: state.entries.map((entry) => ({
        ...entry,
        tags: entry.tags.filter(withoutTag),
      })),
    };
  }),

  // Entries

  createEntry: actionCreator((state, entry: TOCEntry) => ({
    ...state,
    entries: state.entries.concat(entry),
  })),

  updateEntry: actionCreator(
    (state, entryText: string, updater: Partial<TOCEntry>) => ({
      ...state,
      entries: state.entries.map((entry) =>
        entry.text === entryText ? { ...entry, ...updater } : entry
      ),
    })
  ),

  deleteEntry: actionCreator((state, entryText: string) => ({
    ...state,
    entries: state.entries.filter((entry) => entry.text !== entryText),
  })),

  // Freehand

  setFreehandText: actionCreator((state, value: string) => ({
    ...state,
    freehandText: value,
  })),
};
