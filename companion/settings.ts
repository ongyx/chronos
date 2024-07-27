import { me as companion } from "companion";
import { outbox } from "file-transfer";
import { Image } from "image";
import { device } from "peer";
import { settingsStorage } from "settings";

import { getSelected, getImageUri } from "../common/jsx";
import { sendMessage } from "../common/message";
import { defaultCompanionSettings } from "../common/settings";

/**
 * Initializes the companion's settings.
 */
export function init() {
  // Whenever a setting changes locally, send it to the device.
  settingsStorage.addEventListener("change", event => {
    // Reset settings when the storage is cleared.
    if (event.key === null || event.newValue === null) {
      console.log("Resetting settings...");
      reset();
      return;
    }

    // Send the new settings when the value changes.
    if (event.newValue !== event.oldValue) {
      sendSetting(event.key, event.newValue);
    }
  });

  if (settingsStorage.length === 0) {
    // Initialize settings on first run.
    console.log("Initializing settings...");
    reset();
  }

  if (companion.launchReasons.settingsChanged) {
    console.log("Syncing settings...");
    sync();
  }
}

/**
 * Resets all settings to their defaults, including those shared with the device.
 */
function reset() {
  const companionSettings = defaultCompanionSettings();

  // Add the screen width and height for cropping background images.
  const { width, height } = device.screen;
  companionSettings.screenWidth = width;
  companionSettings.screenHeight = height;

  // Add default companion settings.
  for (const key in companionSettings) {
    const value = companionSettings[key];

    settingsStorage.setItem(key, JSON.stringify(value));
  }

  sendMessage({ type: "reset" })
}

/**
 * Synchronizes all shared settings to the device.
 */
function sync() {
  for (let i = 0; i < settingsStorage.length; i++) {
    const key = settingsStorage.key(i);
    const value = settingsStorage.getItem(key ?? "");

    if (key !== null && value !== null) {
      sendSetting(key, value);
    }
  }
}

/**
 * Sends a shared setting as a key-value pair to the device.
 *
 * @param key - The setting's key.
 * @param jsonValue - The setting's value in JSON, retrieved from `settingsStorage`.
 */
function sendSetting(key: string, jsonValue: string) {
  let value = JSON.parse(jsonValue);

  switch (key) {
    case "textAlignment":
      // Get the actual selected value.
      value = getSelected(value);
      break;

    case "textColor":
      if (value instanceof Object) {
        // The text color has been overriden by the input box.
        value = value.value;
      }

      break;

    case "backgroundImage":
      value = sendBackgroundImage(getImageUri(value));
      break;

    default:
      // The setting should not be shared with the device.
      return;
  }

  sendMessage({ type: "setting", key, value, });
}

/**
 * Sends a background image to the device.
 *
 * @param uri - The background image as a Base64 encoded Data URI.
 * @returns The background image's filename.
 */
function sendBackgroundImage(uri: string): string {
  const filename = `${Date.now()}.txi`;

  Image.from(uri)
    .then(image => image.export("image/vnd.fitbit.txi", { background: "#FFFFFF", }))
    .then(buf => outbox.enqueue(filename, buf))
    .then(ft => console.log(`Sent file ${ft.name}`));

  return filename;
}