const TEXT_START = "text-start";
const TEXT_MIDDLE = "text-middle";
const TEXT_END = "text-end";
const TEXT_UPPERCASE = "text-uppercase";
const TEXT_LOWERCASE = "text-lowercase";
const TEXT_CAPITALIZE = "text-capitalize";

import { TokenList } from "./tokenlist";

/**
 * Sets the anchor of a text element relative to its parent container.
 *
 * @param elem - The text element.
 * @param anchor - The anchor to set to.
 */
export function setTextAnchor(
  elem: TextElement,
  anchor: "start" | "middle" | "end",
) {
  const classList = new TokenList(elem);

  // Remove any existing anchor classes.
  classList.remove(TEXT_START, TEXT_MIDDLE, TEXT_END);

  switch (anchor) {
    case "start":
      classList.add(TEXT_START);
      break;
    case "middle":
      classList.add(TEXT_MIDDLE);
      break;
    case "end":
      classList.add(TEXT_END);
      break;
  }
}

/**
 * Sets the casing of the text element. This only affects the text's display, not the actual text content.
 *
 * @param elem - The text element.
 * @param casing - The text case, or null to remove any casing.
 */
export function setTextCase(
  elem: TextElement,
  casing: "upper" | "lower" | "capital" | "none",
) {
  const classList = new TokenList(elem);

  classList.remove(TEXT_UPPERCASE, TEXT_LOWERCASE, TEXT_CAPITALIZE);

  switch (casing) {
    case "upper":
      classList.add(TEXT_UPPERCASE);
      break;

    case "lower":
      classList.add(TEXT_LOWERCASE);
      break;

    case "capital":
      classList.add(TEXT_CAPITALIZE);
      break;

    case "none":
      // Explicit no-op.
      break;
  }
}
