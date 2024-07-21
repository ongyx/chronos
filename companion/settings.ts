import * as messaging from "messaging";
import { settingsStorage } from "settings";

export function init() {
  settingsStorage.addEventListener("change", event => {
    if (event.oldValue !== event.newValue && event.newValue) {
      sendSettings({
        key: event.key,
        value: JSON.parse(event.newValue),
      });
    }
  })
}

function sendSettings(data: any) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log("peerSocket connection is unavailable.");
  }
}