import { init as backgroundInit, setBackgroundColor, setBackgroundImage } from "./background";
import { init as settingsInit } from "./settings";
import { init as clockInit, setAlignment, setColor } from "./clock";

backgroundInit();

settingsInit(settings => {
  console.log(`Settings updated to ${JSON.stringify(settings)}`);

  setAlignment(settings.textAlignment);
  setColor(settings.textColor);
  setBackgroundImage(settings.backgroundImage);
  setBackgroundColor(settings.backgroundColor);
});

clockInit();

