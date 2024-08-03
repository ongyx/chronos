/**
 * A data source that displays information in the UI.
 */
export interface Complication {
  /**
   * Activates the complication.
   *
   * @param context - The UI context.
   */
  activate(ui: UI): void;

  /**
   * Deactivates the complication.
   */
  deactivate(): void;
}

/**
 * A UI context for complications to show their data.
 *
 * Currently, the UI only consists of a text label and image icon.
 */
export interface UI {
  /**
   * The text label.
   */
  label: TextElement;

  /**
   * The image icon.
   */
  icon: ImageElement;

  /**
   * Refreshes the UI. This must be called whenever any change is made.
   */
  refresh: () => void;
}
