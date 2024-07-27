import { outbox } from "file-transfer";
import { Image } from "image";
import { device } from "peer";
import { settingsStorage } from "settings";

import { getSelected, getImageUri } from "../common/jsx";
import { sendMessage } from "../common/message";
import { defaultCompanionSettings } from "../common/settings";

const BACKGROUND_IMAGE_NAME = "background.txi";

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
  } else {
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

    case "backgroundImage":
      const uri = getImageUri(value);

      // Only send the background image if it is set.
      if (uri !== "data:,") {
        sendBackgroundImage(uri);
        value = `/private/data/${BACKGROUND_IMAGE_NAME}`;
      } else {
        value = "";
      }

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
 */
function sendBackgroundImage(uri: string) {
  Image.from(uri)
    .then(image => image.export("image/vnd.fitbit.txi", { background: "#FFFFFF", }))
    .then(buf => outbox.enqueue(BACKGROUND_IMAGE_NAME, buf))
    .then(ft => console.log(`Sent file ${ft.name}`));
}