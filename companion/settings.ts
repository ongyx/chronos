import { settingsStorage } from "settings";

import { sendMessage } from "../common/message";
import { Settings, defaultSettings } from "../common/settings";
import { Selection, getSelected } from "./jsx";

/**
 * Initializes the companion's settings.
 */
export function init() {
  settingsStorage.addEventListener("change", event => {
    if (
      event.key !== null
      && event.oldValue !== event.newValue
      && event.newValue !== null
    ) {
      const key = event.key;
      let value = JSON.parse(event.newValue);

      switch (key) {
        case "textAlignment":
          value = getSelected(value as Selection);
          break;
        default:
          console.error(`Unknown settings key ${key}`);
          break;
      }

      sendMessage({ type: "setting", key, value, });
    }
  });

  if (settingsStorage.length === 0) {
    reset();
  }
}

function reset() {
  for (const key in defaultSettings) {
    const value = defaultSettings[key];

    settingsStorage.setItem(key, JSON.stringify(value));
  }
}