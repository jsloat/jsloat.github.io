export const hasAppliedClassInPreviousRender = (...classNames: string[]) =>
  classNames.some(className => document.querySelector(`.${className}`));

// eslint-disable-next-line no-console
export const warnError = (msg: string) => console.error(msg);
