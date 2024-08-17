import document from "document";
import { vibration } from "haptics";

import { setTextAnchor } from "./css";
import { Complication } from "./complication";
import { ActiveZoneMinutes } from "./complications/active-zone-minutes";
import { Battery } from "./complications/battery";
import { HeartRate } from "./complications/heart-rate";
import { Steps } from "./complications/steps";
import { Calories } from "./complications/calories";

const container = document.getElementById("complication")! as GraphicsElement;
const label = document.getElementById("complication-text")! as TextElement;
const icon = document.getElementById("complication-icon")! as ImageElement;

const availableComplications: { [name in ID]: Complication } = {
  active_zone_minutes: new ActiveZoneMinutes(),
  battery: new Battery(),
  calories: new Calories(),
  heart_rate: new HeartRate(),
  steps: new Steps(),
};

let selectedComplications: Complication[] = [];
let selectedIndex = 0;

let currentAlign: "start" | "middle" | "end" | undefined;

/** The complication IDs currently available. */
export type ID =
  | "active_zone_minutes"
  | "battery"
  | "calories"
  | "heart_rate"
  | "steps";

/**
 * Initializes the clock's complications.
 *
 * @param ids - The complications by ID.
 */
export function init(...ids: ID[]) {
  setComplications(...ids);
}

export function show() {
  container.style.display = "inherit";
}

export function hide() {
  container.style.display = "none";
}

/**
 * Cycles to the next complication in the complications list.
 * If the end of the list is reached, this cycles back to the first complication.
 */
export function cycle() {
  // Bail if there are no complications to cycle through.
  if (!selectedComplications) {
    return;
  }

  const previousIndex = selectedIndex;

  selectedIndex++;
  if (selectedIndex >= selectedComplications.length) {
    selectedIndex = 0;
  }

  const previous = selectedComplications[previousIndex];
  const current = selectedComplications[selectedIndex];

  if (selectedIndex != previousIndex) {
    previous.deactivate();
    current.activate({ label, icon, refresh });

    vibration.start("bump");
  }
}

/**
 * Sets the complications to cycle through.
 *
 * @param ids - The complications by ID.
 */
export function setComplications(...ids: ID[]) {
  const complications = ids.map((id) => availableComplications[id]);

  // Don't change the complications if they are the same.
  if (arrayEqual(complications, selectedComplications)) {
    return;
  }

  if (selectedComplications.length > 0) {
    // Deactivate the previous complication on screen.
    selectedComplications[selectedIndex].deactivate();
  }

  selectedComplications = complications;
  selectedIndex = 0;

  if (complications.length > 0) {
    // Show the label and icon.
    container.style.display = "inline";

    // Activate the new current complication on screen.
    complications[0].activate({ label, icon, refresh });
  } else {
    // Hide the label and icon.
    container.style.display = "none";
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

/**
 * Sets the color of the complication icon and text.
 *
 * @param color - The color to use. Must be a valid CSS color.
 */
export function setColor(color: string) {
  for (const elem of [label, icon]) {
    try {
      elem.style.fill = color;
    } catch {
      // Default to white if invalid.
      elem.style.fill = "white";
    }
  }
}

function refresh() {
  if (currentAlign !== undefined) {
    // This recalculates the position of the icon if the text changes.
    setAlignment(currentAlign);
  }
}

function arrayEqual<T>(a: T[], b: T[]): boolean {
  return a.length == b.length && a.every((v, i) => v == b[i]);
}
