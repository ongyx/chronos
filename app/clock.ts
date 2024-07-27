import clock, { TickEvent } from "clock";
import document from "document";
import { preferences, locale as localeSettings } from "user-settings";
import { setTextAnchor } from "./css";

import { getLocale } from "./i18n/registry";

const timeLabel = document.getElementById("time")! as TextElement;

const timeSuffixLabel = document.getElementById("time-suffix")! as TextElement;

const dateLabel = document.getElementById("date")! as TextElement;

/**
 * Initializes the app's clock.
 */
export function init() {
  clock.granularity = "seconds";

  clock.addEventListener("tick", event => {
    updateTime(event);
    updateDate(event);
  });
}

/**
 * Sets the alignment of the clock text.
 *
 * @param align - The alignment to use.
 */
export function setAlignment(align: "start" | "middle" | "end") {
  setTextAnchor(timeLabel, align);
  setTextAnchor(dateLabel, align);

  if (align === "end") {
    // Make the suffix appear before the time by anchoring to the end.
    setTextAnchor(timeSuffixLabel, "end");
  } else {
    setTextAnchor(timeSuffixLabel, "start");
  }
}

/**
 * Sets the color of the clock text.
 *
 * @param color - The color to use.
 */
export function setColor(color: string) {
  for (const label of [timeLabel, dateLabel, timeSuffixLabel]) {
    try {
      label.style.fill = color;
    } catch {
      // Default back to white.
      label.style.fill = "white";
    }
  }
}

/**
 * Zero pads an integer number if it is less than 10.
 */
function zeroPad(n: number): string {
  n |= 0;

  if (n < 10) {
    return `0${n}`;
  }

  return String(n)
}

/**
 * Formats the given Date to a time string for display.
 *
 * @param date - The date to format.
 * @param prefer12Hour - Whether or not to use 12-hour format.
 * @returns The time string to display, and the am/pm suffix if prefer12Hour is true.
 */
function formatTime(date: Date, prefer12Hour: boolean): [string, string] {
  let mins = date.getMinutes();
  let hours = date.getHours();

  if (prefer12Hour) {
    let suffix = hours < 12 ? "am" : "pm";
    // Convert to 12-hour time after the suffix check. If the time is 12am or 12pm, correct it.
    hours = hours % 12 || 12;

    return [`${hours}:${zeroPad(mins)}`, suffix];
  } else {
    return [`${zeroPad(hours)}:${zeroPad(mins)}`, ""];
  }
}

function updateTime(event: TickEvent) {
  let prefer12Hour = preferences.clockDisplay == "12h";

  let [time, suffix] = formatTime(event.date, prefer12Hour);

  timeLabel.text = time;
  timeSuffixLabel.text = suffix;
}

function updateDate(event: TickEvent) {
  let locale = getLocale(localeSettings.language);

  dateLabel.text = locale.formatDate(event.date);
}
