import { me as companion } from "companion";
import { outbox } from "file-transfer";
import * as cbor from "cbor";
import { Image } from "image";
import { device } from "peer";
import { settingsStorage } from "settings";

import {
  CompanionSettings,
  DEVICE_SETTINGS_FILE,
  defaultCompanionSettings,
  parseDeviceSettings,
} from "../common/settings";

const SYNC_DELAY = 2500;

let syncHandle: number | undefined;
let syncOnChange = true;

/**
 * Initializes the companion's settings.
 */
export function init() {
  settingsStorage.addEventListener("change", onSettingsStorageChange);

  if (settingsStorage.length === 0) {
    // Initialize settings on first run.
    console.log("Initializing companion settings.");
    resetCompanionSettings();
  }

  if (companion.launchReasons.settingsChanged) {
    // Sync settings when the settings are changed while the companion is not running.
    console.log("Companion settings changed - syncing to device.");
    syncDeviceSettings(getCompanionSettings());
  }
}

/**
 * Resets all settings to their defaults, including those shared with the device.
 */
export function resetCompanionSettings() {
  const companionSettings = defaultCompanionSettings();

  // Add the screen width and height for cropping background images.
  const { width, height } = device.screen;
  companionSettings.screenWidth = width;
  companionSettings.screenHeight = height;

  setCompanionSettings(companionSettings);
}

/**
 * Returns the companion settings persisted in `settingsStorage`.
 *
 * @returns The companion settings in use.
 */
export function getCompanionSettings(): CompanionSettings {
  const settings = {};

  for (let i = 0; i < settingsStorage.length; i++) {
    const key = settingsStorage.key(i);
    const value = settingsStorage.getItem(key ?? "");

    if (key !== null && value !== null) {
      settings[key] = JSON.parse(value);
    }
  }

  return settings as CompanionSettings;
}

/**
 * Persists the given companion settings in `settingsStorage`, and synchronizes them with the device.
 *
 * @param settings - The companion settings to use.
 */
export function setCompanionSettings(settings: CompanionSettings) {
  // Disable sync on change.
  syncOnChange = false;

  settingsStorage.clear();

  for (const key in settings) {
    const value = settings[key];

    settingsStorage.setItem(key, JSON.stringify(value));
  }

  // Enable sync on change.
  syncOnChange = true;

  syncDeviceSettings(settings);
}

/*
 * Synchronizes companion settings to the device.
 *
 * @param companionSettings - The companion settings to sync to.
 */
function syncDeviceSettings(companionSettings: CompanionSettings) {
  const deviceSettings = parseDeviceSettings(companionSettings);
  const backgroundImage = deviceSettings.backgroundImage;

  if (backgroundImage !== undefined && backgroundImage.startsWith("data:")) {
    // Upload the background image using the Base64 URI.
    deviceSettings.backgroundImage = sendBackgroundImage(backgroundImage);
  }

  const settingsData = cbor.encode(deviceSettings);

  outbox.enqueue(DEVICE_SETTINGS_FILE, settingsData);
}

/**
 * Sends a background image to the device.
 *
 * @param uri - The background image as a Base64 encoded Data URI.
 * @returns The background image's filename on the device.
 */
function sendBackgroundImage(uri: string): string {
  const filename = `${Date.now()}.jpg`;

  Image.from(uri)
    .then((image) =>
      image.export("image/jpeg", { background: "#FFFFFF", quality: 40 }),
    )
    .then((buf) => outbox.enqueue(filename, buf))
    .then((ft) => console.log(`settings: Sent background image ${ft.name}`));

  return filename;
}

function onSettingsStorageChange(event: StorageChangeEvent) {
  if (event.key === null) {
    // The settings were reset from the TSX page.
    console.log(`settings: Resetting and syncing`);

    resetCompanionSettings();
    return;
  }

  if (syncOnChange) {
    // The settings have changed, so sync them to the device.

    if (syncHandle !== undefined) {
      console.log(`settings: Cancelling sync handle ${syncHandle}`);

      // Cancel the existing sync.
      clearTimeout(syncHandle);
    }

    syncHandle = setTimeout(() => {
      console.log("settings: Starting sync with device");

      syncDeviceSettings(getCompanionSettings());
      syncHandle = undefined;
    }, SYNC_DELAY);

    console.log(`settings: Starting sync handle ${syncHandle}`);
  }
}
