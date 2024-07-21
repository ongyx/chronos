import * as fs from "fs";
import * as messaging from "messaging";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

let settings = {};

function readSettings() {
  try {
    settings = fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (e) {
    console.log(`Error occurred reading ${SETTINGS_FILE}: ${e}`);
    settings = {};
  }
}

function writeSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}

/**
 * Initializes the app's settings.
 *
 * @param onUpdate - Callback for settings updates.
 */
export function init(onUpdate?: (settings: any) => void) {
  readSettings();

  messaging.peerSocket.addEventListener("message", event => {
    let data: { key: string, value: any } = event.data;
    settings[data.key] = data.value;

    onUpdate?.(settings);
  });
}
