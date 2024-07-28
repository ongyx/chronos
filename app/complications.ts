import document from "document";

import { setTextAnchor } from "./css";
import { Complication } from "./complication";

const container = document.getElementById("complication")! as GraphicsElement;
const label = document.getElementById("complication-text")! as TextElement;
const icon = document.getElementById("complication-icon")! as ImageElement;

let currentAlign: "start" | "middle" | "end" | undefined;

let complications: Complication[] = [];
let index = 0;

/**
 * Initializes the clock's complications.
 *
 * @param ccs - The complications to show. There must be at least one complication.
 */
export function init(...ccs: Complication[]) {
  complications = ccs;

  if (complications.length > 0) {
    setComplication(0);
  } else {
    console.error("Complications are empty!");
  }
}

/**
 * Sets the complication to show on the clock face.
 *
 * @param idx - The index of the complication to show.
 */
export function setComplication(idx: number) {
  const previous = complications[index];
  previous?.deactivate();

  index = idx;

  const current = complications[index];
  current.activate({ label, icon, refresh });
}

function refresh() {
  if (currentAlign !== undefined) {
    // This recalculates the position of the icon if the text changes.
    setAlignment(currentAlign);
  }
}

/**
 * Sets the alignment of the complication text.
 *
 * @param align - The alignment to use.
 */
export function setAlignment(align: "start" | "middle" | "end") {
  setTextAnchor(label, align);

  const containerBBox = container.getBBox();
  const labelBBox = label.getBBox();
  const iconBBox = icon.getBBox();

  switch (align) {
    case "start":
      icon.x = labelBBox.width + 5;
      break;

    case "middle":
      icon.x = (containerBBox.width / 2) + (labelBBox.width / 2) + 5;
      break;

    case "end":
      icon.x = containerBBox.width - labelBBox.width - iconBBox.width - 5;
      break;
  }

  currentAlign = align;
}
