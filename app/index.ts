import { init as settingsInit } from "./settings";
import { init as clockInit, setAlignment } from "./clock";

settingsInit(settings => {
  if (settings.textAlignment) {
    setAlignment(settings.textAlignment);
  }
});
clockInit();

