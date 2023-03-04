import copyIcon from "../../assets/copy.svg";
import checkmarkIcon from "../../assets/checkmark.svg";
import { createHTMLElement, isHTMLElement } from "src/domUtils";
import { hasAppliedClassInPreviousRender, warnError } from "./utils";
import {
  CODEBLOCK_PARENT_CLASS,
  COPY_BUTTON_CLASS,
  DID_COPY_CLASS,
  INLINE_CODE_CLASS,
} from "../consts";

const DID_COPY_ICON = checkmarkIcon;
const COPY_ICON = copyIcon;

const addClassToCodeblockParents = () => {
  if (hasAppliedClassInPreviousRender(CODEBLOCK_PARENT_CLASS)) {
    return;
  }
  const codeBlocks = document.querySelectorAll("code");
  if (!codeBlocks.length) return;
  codeBlocks.forEach(codeBlock => {
    const parent = codeBlock.parentElement;
    if (!parent) return warnError("Parent element not found for code block");
    if (parent instanceof HTMLPreElement) {
      parent.classList.add(CODEBLOCK_PARENT_CLASS);
    } else {
      codeBlock.classList.add(INLINE_CODE_CLASS);
    }
  });
};

type OnCopyButtonClickOpts = {
  codeBlockEl: HTMLElement;
  copyButtonEl: HTMLElement;
  iconEl: HTMLElement;
};
const onCopyButtonClick = ({
  codeBlockEl,
  copyButtonEl,
  iconEl,
}: OnCopyButtonClickOpts) => {
  navigator.clipboard.writeText(codeBlockEl.innerText);
  copyButtonEl.classList.add(DID_COPY_CLASS);
  iconEl.setAttribute("src", DID_COPY_ICON);
  setTimeout(() => {
    copyButtonEl.classList.remove(DID_COPY_CLASS);
    iconEl.setAttribute("src", COPY_ICON);
  }, 2000);
};

const addCopyButtonToCodeBlock = (codeBlockParentEl: Element) => {
  const codeBlockEl = codeBlockParentEl.firstChild;
  if (!(codeBlockEl && isHTMLElement(codeBlockEl))) {
    return warnError("No code block in parent");
  }

  const iconEl = createHTMLElement({
    tagName: "img",
    attrs: { src: COPY_ICON, title: "Copy code" },
  });

  const copyButtonEl = createHTMLElement({
    tagName: "div",
    classNames: [COPY_BUTTON_CLASS],
    children: [iconEl],
  });

  copyButtonEl.onclick = () =>
    onCopyButtonClick({ codeBlockEl, copyButtonEl, iconEl });

  const copyButtonContainerEl = createHTMLElement({
    tagName: "div",
    children: [copyButtonEl],
  });

  codeBlockParentEl.appendChild(copyButtonContainerEl);
};

export default () => {
  addClassToCodeblockParents();

  if (!hasAppliedClassInPreviousRender(COPY_BUTTON_CLASS)) {
    document
      .querySelectorAll(`.${CODEBLOCK_PARENT_CLASS}`)
      .forEach(codeBlockParentEl =>
        addCopyButtonToCodeBlock(codeBlockParentEl)
      );
  }
};
