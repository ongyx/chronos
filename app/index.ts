import clock from "clock";
import document from "document";

import {
  init as backgroundInit,
  setColor as setBackgroundColor,
  setImage as setBackgroundImage,
} from "./background";
import {
  cycle as complicationsCycle,
  init as complicationsInit,
  setAlignment as setComplicationsAlignment,
  setColor as setComplicationsColor,
} from "./complications";
import { init as settingsInit } from "./settings";
import {
  init as clockInit,
  setAlignment as setClockAlignment,
  setCase as setClockUppercase,
  setColor as setClockColor,
} from "./clock";

import { Battery } from "./complications/battery";
import { HeartRate } from "./complications/heart-rate";
import { Steps } from "./complications/steps";
import { ActiveZoneMinutes } from "./complications/active-zone-minutes";

const touchArea = document.getElementById("touch-area")!;

backgroundInit();

complicationsInit(
  new Battery(),
  new HeartRate(),
  new Steps(),
  new ActiveZoneMinutes(),
);

// Cycle complications when the screen is tapped.
touchArea.addEventListener("click", () => {
  complicationsCycle();
});

settingsInit((settings) => {
  setClockAlignment(settings.textAlignment);
  setClockUppercase(settings.textCase);
  setClockColor(settings.textColor);
  setComplicationsAlignment(settings.textAlignment);
  setComplicationsColor(settings.textColor);
  setBackgroundImage(settings.backgroundImage);
  setBackgroundColor(settings.backgroundColor);

  clock.granularity = settings.clockGranularity;
});

clockInit();
