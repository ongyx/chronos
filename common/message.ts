import * as messaging from "messaging";

/**
 * A message sent between the device and companion.
 */
export type Message = SettingsAdd | SettingsRemove | SettingsReset;

/**
 * A message for adding or changing settings.
 */
export interface SettingsAdd {
  type: "settings.add",
  key: string,
  value: any,
}

/**
 * A message for removing settings.
 */
export interface SettingsRemove {
  type: "settings.remove",
  key: string,
}

/**
 * A message for resetting settings.
 */
export interface SettingsReset {
  type: "settings.reset",
}

/**
 * Checks if the peer socket is ready to send messages.
 */
export function canSendMessage(): boolean {
  return messaging.peerSocket.readyState === messaging.peerSocket.OPEN;
}

/**
 * Sends a message to the peer.
 *
 * @param msg - The message to send.
 * @returns True if the peer socket is open, otherwise false.
 */
export function sendMessage(msg: Message): boolean {
  if (canSendMessage()) {
    messaging.peerSocket.send(msg);
    return true;
  }

  return false;
}

/**
 * Receives a message from the peer asynchronously through a callback.
 *
 * @param callback - The message callback.
 */
export function recvMessage(callback: (msg: Message) => void) {
  messaging.peerSocket.addEventListener("message", event => {
    if (event.data["type"] !== undefined) {
      callback(event.data as Message);
    }
  })
}
