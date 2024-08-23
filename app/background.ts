import document from "document";
import * as jpeg from "jpeg";
import { existsSync, unlinkSync } from "fs";

import * as inbox from "./inbox";

const backgroundContainer = document.getElementById(
  "background",
) as GraphicsElement;
const backgroundColor = document.getElementById(
  "background-color",
)! as GraphicsElement;
const backgroundImage = document.getElementById(
  "background-image",
)! as ImageElement;

/** Initializes the app's background. */
export function init() {
  inbox.addHandler("jpg", (path, _) => {
    const txiPath = path.replace(/.jpg$/, ".txi");

    // Convert the JPEG into a TXI file and delete the original.
    jpeg.decodeSync(path, txiPath);
    unlinkSync(path);

    setImage(txiPath);
  });
}

/** Shows the background image and color. */
export function show() {
  backgroundContainer.style.display = "inherit";
}

/** Hides the background image and color. */
export function hide() {
  backgroundContainer.style.display = "none";
}

/**
 * Sets the app's background color.
 *
 * @param color - The background color to show.
 */
export function setColor(color: string) {
  try {
    backgroundColor.style.fill = color;
  } catch {
    backgroundColor.style.fill = "black";
  }
}

/**
 * Sets the app's background image. This deletes the previous background image, if any.
 *
 * @param path - The background image path.
 */
export function setImage(path: string) {
  if (!existsSync(path)) {
    // The background image may still be transferring, so bail if it does not exist.
    // The inbox handler guarantees that the fully transferred background image will be shown.
    return;
  }

  const oldFilename = backgroundImage.href;
  if (path === oldFilename) {
    // Background images are the same - bail.
    return;
  }

  backgroundImage.href = path;

  // Delete the old background image.
  if (oldFilename !== "") {
    unlinkSync(oldFilename);
  }
}

/**
 * Clears the app's background image by deleting it.
 */
export function clearImage() {
  const path = backgroundImage.href;

  backgroundImage.href = "";

  if (path !== "") {
    unlinkSync(path);
  }
}
