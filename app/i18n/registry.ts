import { locale as localeSettings } from "user-settings";

import { Locale } from "./locale";
import { EnUs } from "./en-us";
import { JaJp } from "./ja-jp";
import { ZhCn } from "./zh-cn";
import { ZhTw } from "./zh-tw";

// The locales that can be used.
const LOCALES: { [tag: string]: Locale } = {};

// The regex for BCP-47 tags.
const RE_TAG = /^(\w+)-(\w+)$/;

for (const locale of [new EnUs(), new JaJp(), new ZhCn(), new ZhTw()]) {
  LOCALES[locale.tag] = locale;
}

/**
 * Returns a locale based on the given BCP-47 tag.
 * The tag must be in the format '(lang)-(region)', i.e., 'en-US'.
 *
 * @param tag - The BCP-47 tag.
 * @returns The locale for the tag.
 */
export function getLocale(tag: string): Locale {
  // Canonicalize the tag, as user-settings.locale returns a fully lowercase string.
  tag = canonicalize(tag);

  if (tag in LOCALES) {
    return LOCALES[tag];
  }

  // Fallback to en-us locale.
  return LOCALES["en-US"];
}

/**
 * Returns the current locale based on the user's settings.
 *
 * @returns The current locale.
 */
export function getCurrentLocale(): Locale {
  return getLocale(localeSettings.language);
}

/**
 * Canonicalizes the given BCP-47 tag.
 *
 * @param tag - The BCP-47 tag.
 * @returns The canonicalized tag.
 */
function canonicalize(tag: string): string {
  function replacer(_match: string, lang: string, region: string): string {
    return `${lang}-${region.toUpperCase()}`;
  }

  return tag.replace(RE_TAG, replacer);
}
