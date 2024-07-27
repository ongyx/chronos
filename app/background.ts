import document from "document";
import { inbox } from "file-transfer";
import { existsSync, unlinkSync } from "fs";

const backgroundColor = document.getElementById("background-color")! as GraphicsElement;
const backgroundImage = document.getElementById("background-image")! as ImageElement;

/** Initializes the app's background. */
export function init() {
  inbox.addEventListener("newfile", () => {
    let filename: string | undefined;

    while (filename = inbox.nextFile()) {
      console.log(`Received file ${filename}`);
      setBackgroundImage(filename);
    }
  });
}

/**
 * Sets the app's background image. This deletes the previous background image, if any.
 *
 * @param filename - The filename of the background image. If empty, no background image is shown.
 */
export function setBackgroundImage(filename: string) {
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
  if (filename === oldFilename) {
    // No-op.
    return;
  }

  backgroundImage.href = filename;

  // Delete the old background image.
  if (oldFilename !== "") {
    unlinkSync(oldFilename);
  }
}

/**
 * Sets the app's background color.
 *
 * @param color - The background color to show.
 */
export function setBackgroundColor(color: string) {
  try {
    backgroundColor.style.fill = color;
  } catch {
    backgroundColor.style.fill = "black";
  }

  console.log(backgroundColor.style.fill);
}
