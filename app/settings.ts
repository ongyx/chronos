import * as fs from "fs";

import { recvMessage } from "../common/message";
import { Settings, defaultSettings } from "../common/settings";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

let settings = defaultSettings;

/**
 * Initializes the app's settings.
 *
 * @param onUpdate - Callback for settings updates.
 */
export function init(onUpdate?: (settings: Settings) => void) {
  readSettings();

  recvMessage(msg => {
    if (msg.type === "setting") {
      console.log(`Receiving setting ${msg.key}=${JSON.stringify(msg.value)}`);

      settings[msg.key] = msg.value;
      writeSettings();

      onUpdate?.(settings);
    }
  });
}

function readSettings() {
  try {
    settings = fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (e) {
    // This is empty on purpose; the settings will revert to the defaults if the settings file cannot be read.
  }
}

function writeSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}