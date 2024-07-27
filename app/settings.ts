import document from "document";
import * as fs from "fs";

import { recvMessage } from "../common/message";
import { DeviceSettings, defaultDeviceSettings } from "../common/settings";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

let settings = defaultDeviceSettings();

/**
 * Initializes the app's settings.
 *
 * @param onUpdate - Callback for settings updates.
 */
export function init(onUpdate?: (settings: DeviceSettings) => void) {
  // Read the initial settings from disk.
  readSettings();
  onUpdate?.(settings);

  // When a message is received from the companion, check if there is a change in settings.
  recvMessage(msg => {
    switch (msg.type) {
      case "settings.add":
        console.log(`Adding setting ${msg.key}=${JSON.stringify(msg.value)}`);

        // Update the setting and invoke the update callback, if any.
        settings[msg.key] = msg.value;
        writeSettings();
        onUpdate?.(settings);

        break;

      case "settings.remove":
        console.log(`Removing setting ${msg.key}`);

        delete settings[msg.key];
        writeSettings();
        onUpdate?.(settings);

        break;

      case "settings.reset":
        console.log("Resetting settings...");

        settings = defaultDeviceSettings();
        writeSettings();
        onUpdate?.(settings);

        break;
    }
  });

  // Persist settings when this clock face is unloaded.
  document.addEventListener("unload", (_) => writeSettings());
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