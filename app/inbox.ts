import { inbox } from "file-transfer";

/**
 * A file handler for a specific file extension.
 *
 * @param path - The full path to the file.
 * @param ext - The file extension without the period (i.e., `jpg`).
 */
export type FileHandler = (path: string, ext: string) => void;

/** Filesystem prefix for transferred files. */
export const PREFIX = "/private/data";

/** The file handlers mapped by extension. */
const handlers: { [ext: string]: FileHandler } = {};

/** Initializes the inbox service. */
export function init() {
  inbox.addEventListener("newfile", () => {
    let filename: string | undefined;

    // Iterate over all files in the inbox.
    while ((filename = inbox.nextFile())) {
      console.log(`file: Received file ${filename}`);

      // Get the file handler for the file extension.
      const ext = filename.split(".").pop() ?? "";
      const handler = handlers[ext];

      // Invoke the handler if it exists.
      if (handler !== undefined) {
        console.log(`file: Invoking handler for ${ext}`);

        handler(`${PREFIX}/${filename}`, ext);
      }
    }
  });
}

/**
 * Adds a file handler for the given file extension.
 * If a handler already exists, it is overwritten.
 *
 * @param ext - The file extension to add the handler for. It must not have a leading period.
 * @param handler - The file handler.
 */
export function addHandler(ext: string, handler: FileHandler) {
  handlers[ext] = handler;
}

/**
 * Removes the file handler for the given file extension.
 *
 * @param ext - The file extension to remove the handler for. It must not have a leading period.
 */
export function removeHandler(ext: string) {
  delete handlers[ext];
}

/** Invokes the appropriate handler based on file extension for each file in the inbox. */
function onNewFile() {}
