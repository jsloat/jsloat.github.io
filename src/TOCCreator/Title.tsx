import React from "react";
import EditableDiv from "./EditableDiv";
import { actions, useTOCCreatorContext } from "./TOCCreatorContext";
import { HideWhenPrinting } from "src/atoms";

export default () => {
  const { state, dispatch } = useTOCCreatorContext();
  const { title } = state;
  return (
    <HideWhenPrinting hide={!title}>
      <EditableDiv
        inputText={title}
        displayContent={title}
        onInputChange={newTitle => dispatch(actions.setTitle(newTitle))}
        placeholder="Enter TOC title"
        style={{
          fontSize: "2.5em",
          width: "100%",
          textAlign: "center",
          marginBottom: "1em",
        }}
      />
    </HideWhenPrinting>
  );
};
