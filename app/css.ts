const TEXT_START = "text-start";
const TEXT_MIDDLE = "text-middle";
const TEXT_END = "text-end";

import { TokenList } from "./tokenlist";

/**
 * Sets the anchor of a text element relative to its parent container.
 *
 * @param elem - The text element.
 * @param anchor - The anchor to set to.
 */
export function setTextAnchor(elem: TextElement, anchor: "start" | "middle" | "end") {
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
