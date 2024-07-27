import { init as backgroundInit, setBackground } from "./background";
import { init as settingsInit } from "./settings";
import { init as clockInit, setAlignment } from "./clock";

backgroundInit();

settingsInit(settings => {
  console.log(`Settings updated to ${JSON.stringify(settings)}`);

  setAlignment(settings.textAlignment);
  setBackground(settings.backgroundImage);
});

clockInit();

