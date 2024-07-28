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
 * @param ccs - The complication list to show. There must be at least one complication.
 */
export function init(...ccs: Complication[]) {
  complications = ccs;

  if (complications.length > 0) {
    activate(complications[0]);
  } else {
    console.error("Complications are empty!");
  }
}

/**
 * Activates the next complication in the complications list.
 * If the end of the list is reached, this cycles back to the first complication.
 */
export function cycle() {
  const previousIndex = index;

  index++;
  if (index >= complications.length) {
    index = 0;
  }

  if (index != previousIndex) {
    console.log(`Deactivating complication ${previousIndex}`);
    complications[previousIndex].deactivate();

    console.log(`Activating complication ${index}`);
    activate(complications[index]);
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
      icon.x = containerBBox.width / 2 + labelBBox.width / 2 + 5;
      break;

    case "end":
      icon.x = containerBBox.width - labelBBox.width - iconBBox.width - 5;
      break;
  }

  currentAlign = align;
}

function activate(complication: Complication) {
  complication.activate({ label, icon, refresh });
}

function refresh() {
  if (currentAlign !== undefined) {
    // This recalculates the position of the icon if the text changes.
    setAlignment(currentAlign);
  }
}
