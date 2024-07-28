import clock from "clock";

import { init as backgroundInit, setBackgroundColor, setBackgroundImage } from "./background";
import { init as complicationsInit, setAlignment as setComplicationsAlignment } from "./complications";
import { Battery } from "./complications/battery";
import { init as settingsInit } from "./settings";
import { init as clockInit, setAlignment as setClockAlignment, setColor } from "./clock";

backgroundInit();

complicationsInit(new Battery());

settingsInit(settings => {
  setClockAlignment(settings.textAlignment);
  setComplicationsAlignment(settings.textAlignment);
  setColor(settings.textColor);
  setBackgroundImage(settings.backgroundImage);
  setBackgroundColor(settings.backgroundColor);

  clock.granularity = settings.clockGranularity;
});

clockInit();

