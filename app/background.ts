import document from "document";
import { inbox } from "file-transfer";
import { existsSync, unlinkSync } from "fs";

const backgroundImage = document.getElementById("background")! as ImageElement;

/** Initializes the app's background. */
export function init() {
  inbox.addEventListener("newfile", () => {
    let filename: string | undefined;

    while (filename = inbox.nextFile()) {
      console.log(`Received file ${filename}`);
      setBackground(filename);
    }
  });
}

/**
 * Sets the app's background image. This deletes the previous background image, if any.
 *
 * @param filename - The filename of the background image. If empty, no background image is shown.
 */
export function setBackground(filename: string) {
  if (filename !== "") {
    filename = `/private/data/${filename}`;

    if (!existsSync(filename)) {
      // Don't set the background image.
      // This usually happens because the settings message indicating a change
      // in background image arrives before the background image itself,
      // which results in an error.
      return;
    }
  }

  const oldFilename = backgroundImage.href;

  backgroundImage.href = filename;

  if (oldFilename !== "") {
    unlinkSync(oldFilename);
  }
}
