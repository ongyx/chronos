import document from "document";

import { init as aodInit } from "./aod";
import {
  init as backgroundInit,
  setColor as setBackgroundColor,
  setImage as setBackgroundImage,
  clearImage as clearBackgroundImage,
} from "./background";
import {
  cycle as complicationsCycle,
  init as complicationsInit,
  setAlignment as setComplicationsAlignment,
  setColor as setComplicationsColor,
  setComplications,
} from "./complications";
import { init as inboxInit, PREFIX } from "./inbox";
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

inboxInit();

settingsInit((settings) => {
  setClockAlignment(settings.textAlignment);
  setClockUppercase(settings.textCase);
  setClockColor(settings.textColor);

  setComplications(...settings.complications);
  setComplicationsAlignment(settings.textAlignment);
  setComplicationsColor(settings.complicationsColor);

  if (settings.backgroundImage === undefined) {
    clearBackgroundImage();
  } else {
    // Fix the background image path if needed.
    if (settings.backgroundImage.match(/\.jpg$/)) {
      settings.backgroundImage = `${PREFIX}/${settings.backgroundImage.replace(".jpg", ".txi")}`;
    }

    setBackgroundImage(settings.backgroundImage);
  }

  setBackgroundColor(settings.backgroundColor);
});

clockInit();
