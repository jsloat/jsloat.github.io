export const isHTMLElement = (el: any): el is HTMLElement =>
  el instanceof HTMLElement;

type ElementAttributes = Record<string, string>;

const setAttributesOnHTMLElement = (
  el: HTMLElement,
  attrs: ElementAttributes
) => {
  Object.entries(attrs).forEach(([name, value]) =>
    el.setAttribute(name, value)
  );
};

type TagName = keyof HTMLElementTagNameMap;

type NewElement<T extends TagName> = {
  tagName: T;
  attrs?: ElementAttributes;
  children?: (HTMLElement | NewElement<any>)[];
  classNames?: string[];
  onclick?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
};

export const createHTMLElement = <T extends TagName>({
  tagName,
  attrs,
  children,
  classNames,
  onclick,
}: NewElement<T>): HTMLElementTagNameMap[T] => {
  const el = document.createElement(tagName);
  if (attrs) setAttributesOnHTMLElement(el, attrs);
  if (classNames?.length) {
    classNames.forEach(className => el.classList.add(className));
  }
  if (onclick) el.onclick = onclick;
  if (children?.length) {
    children.forEach(newChildElement =>
      el.appendChild(
        isHTMLElement(newChildElement)
          ? newChildElement
          : createHTMLElement(newChildElement)
      )
    );
  }
  return el;
};
