import document from "document";

import { init as aodInit } from "./aod";
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
  setComplications,
} from "./complications";
import { init as settingsInit } from "./settings";
import {
  init as clockInit,
  setAlignment as setClockAlignment,
  setCase as setClockUppercase,
  setColor as setClockColor,
} from "./clock";

const touchArea = document.getElementById("touch-area")!;

aodInit();

backgroundInit();

complicationsInit();

// Cycle complications when the screen is tapped.
touchArea.addEventListener("click", () => {
  complicationsCycle();
});

settingsInit((settings) => {
  setClockAlignment(settings.textAlignment);
  setClockUppercase(settings.textCase);
  setClockColor(settings.textColor);

  setComplications(...settings.complications);
  setComplicationsAlignment(settings.textAlignment);
  setComplicationsColor(settings.complicationsColor);

  setBackgroundImage(settings.backgroundImage);
  setBackgroundColor(settings.backgroundColor);
});

clockInit();
