import { init as settingsInit } from "./settings";
import { init as clockInit, setTextAlignment } from "./clock";

settingsInit(settings => {
  if (settings.textAlignment) {
    setTextAlignment(settings.textAlignment);
  }
});
clockInit();

