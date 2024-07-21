import clock, { TickEvent } from "clock";
import document from "document";
import { preferences, locale as localeSettings } from "user-settings";
import { TEXT_LEFT, TEXT_RIGHT } from "./css";

import { getLocale } from "./i18n/registry";
import { TokenList } from "./tokenlist";

const timeLabel = document.getElementById("time")! as TextElement;

const timeSuffixLabel = document.getElementById("time-suffix")! as TextElement;

const dateLabel = document.getElementById("date")! as TextElement;

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

/**
 * Initializes the app's clock.
 */
export function init() {
  clock.granularity = "seconds";

  clock.ontick = (event) => {
    updateTime(event);
    updateDate(event);
  }
}

export function setTextAlignment(align: "left" | "right") {
  for (let elem of document.getElementsByTagName("text")) {
    let classList = new TokenList(elem);

    if (align === "left") {
      classList.replace(TEXT_LEFT, TEXT_RIGHT);
    } else if (align === "right") {
      classList.replace(TEXT_RIGHT, TEXT_LEFT);
    }
  }
}