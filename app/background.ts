import document from "document";
import { inbox } from "file-transfer";

const backgroundImage = document.getElementById("background")! as ImageElement;

/** Initializes the app's background. */
export function init() {
  inbox.addEventListener("newfile", () => {
    let filename: string | undefined;

    while (filename = inbox.nextFile()) {
      console.log(`Received file ${filename}`);
    }
  });
}

/**
 * Sets the app's background image.
 *
 * @param path - The path to the background image. If empty, no background image is shown.
 */
export function setBackground(path: string) {
  backgroundImage.href = path;
}
