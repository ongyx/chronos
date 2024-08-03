/**
 * An interface that allows localization of certain text.
 */
export interface Locale {
  /**
   * The BCP-47 tag for the locale.
   * @see {@link https://en.wikipedia.org/wiki/IETF_language_tag} for details.
   */
  readonly tag: string;

  /**
   * Formats the given Date as a date string for display.
   *
   * @param date - The Date instance to format.
   * @returns The formatted date.
   */
  formatDate(date: Date): string;
}
