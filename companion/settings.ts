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
  settingsStorage.addEventListener("change", (event) => {
    if (event.key === null) {
      // Storage was cleared, so reset settings.
      console.log("Resetting settings...");
      reset();
      return;
    }

    // Only change settings if the values differ.
    if (event.newValue !== event.oldValue) {
      if (event.newValue === null) {
        // The setting was removed from storage.
        removeDeviceSettings(event.key);
      } else {
        // The setting was added to or changed in the storage.
        addDeviceSettings(event.key, event.newValue);
      }
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

  resetDeviceSettings();
}

/**
 * Synchronizes all shared settings to the device.
 */
function sync() {
  for (let i = 0; i < settingsStorage.length; i++) {
    const key = settingsStorage.key(i);
    const value = settingsStorage.getItem(key ?? "");

    if (key !== null && value !== null) {
      addDeviceSettings(key, value);
    }
  }
}

/**
 * Adds a setting as a key-value pair to the device.
 *
 * @param key - The setting's key.
 * @param jsonValue - The setting's value in JSON, retrieved from `settingsStorage`.
 */
function addDeviceSettings(key: string, jsonValue: string) {
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

    case "textCase":
      value = getSelected(value);
      break;

    case "backgroundImage":
      if (value) {
        // Only send the background image if it is defined.
        value = sendBackgroundImage(getImageUri(value));
      }
      break;

    case "backgroundColor":
      if (value instanceof Object) {
        value = value.value;
      }

      break;

    case "clockGranularity":
      value = getSelected(value);
      break;

    default:
      // The setting should not be shared with the device.
      return;
  }

  sendMessage({ type: "settings.add", key, value });
}

/**
 * Removes a setting from the device.
 *
 * @param key - The setting's key.
 */
function removeDeviceSettings(key: string) {
  sendMessage({ type: "settings.remove", key });
}

/**
 * Resets all settings on the device.
 */
function resetDeviceSettings() {
  sendMessage({ type: "settings.reset" });
}

/**
 * Sends a background image to the device.
 *
 * @param uri - The background image as a Base64 encoded Data URI.
 * @returns The background image's filename.
 */
function sendBackgroundImage(uri: string): string {
  const filename = `${Date.now()}.jpg`;

  Image.from(uri)
    .then((image) =>
      image.export("image/jpeg", { background: "#FFFFFF", quality: 40 }),
    )
    .then((buf) => outbox.enqueue(filename, buf))
    .then((ft) => console.log(`Sent file ${ft.name}`));

  return filename;
}
