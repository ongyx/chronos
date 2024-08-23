import * as fs from "fs";

import {
  DeviceSettings,
  DEVICE_SETTINGS_FILE,
  DEVICE_SETTINGS_TYPE,
  defaultDeviceSettings,
} from "../common/settings";

import * as inbox from "./inbox";

/** The full path to the settings file. */
const SETTINGS_FILE = `${inbox.PREFIX}/${DEVICE_SETTINGS_FILE}`;

/** The current set of settings. */
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

  inbox.addHandler("cbor", (path, _) => {
    if (path === SETTINGS_FILE) {
      readSettings();
      onUpdate?.(settings);
    }
  });
}

/** Reads the app's settings from `SETTINGS_FILE`. */
function readSettings() {
  console.log("settings: Reading file");

  try {
    const fileSettings = fs.readFileSync(SETTINGS_FILE, DEVICE_SETTINGS_TYPE);

    // If a setting is added during development, this ensures the default will be present.
    settings = { ...defaultDeviceSettings(), ...fileSettings };
  } catch (e) {
    // The settings will stick to the defaults if the file cannot be read.
    console.log(`settings: Error while reading file: ${e}`);
  }
}
