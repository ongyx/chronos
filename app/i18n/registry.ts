import { Locale } from "./locale";
import { EnUs } from "./en-us";

// The locales that can be used.
const LOCALES: { [tag: string]: Locale } = {};

for (const locale of [new EnUs()]) {
  LOCALES[locale.tag] = locale;
}

/**
 * Get a locale based on the given BCP-47 tag.
 *
 * @param tag - The BCP-47 tag.
 * @returns The locale for the tag.
 */
export function getLocale(tag: string): Locale {
  if (tag in LOCALES) {
    return LOCALES[tag.toLowerCase()];
  }

  // Fallback to en-us locale.
  return LOCALES["en-us"];
}
