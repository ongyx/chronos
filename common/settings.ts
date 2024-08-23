import { ID } from "../app/complications";

import {
  ColorSelect,
  getAllSelected,
  getColorSelected,
  getSelected,
  ImagePicker,
  Select,
  SelectValue,
} from "./jsx";

export const DEVICE_SETTINGS_FILE = "settings.cbor";
export const DEVICE_SETTINGS_TYPE = "cbor";

/** Options for text alignment. */
export const textAlignmentOptions = [
  { name: "Left", value: "start" },
  { name: "Center", value: "middle" },
  { name: "Right", value: "end" },
];

/** Options for text case. */
export const textCaseOptions = [
  { name: "Uppercase", value: "upper" },
  { name: "Lowercase", value: "lower" },
  { name: "Capitalize", value: "capital" },
  { name: "None", value: "none" },
];

/** Options for complications. */
export const complicationsOptions = [
  { name: "Battery", value: "battery" },
  { name: "Heart Rate", value: "heart_rate" },
  { name: "Steps", value: "steps" },
  { name: "Active Zone Minutes", value: "active_zone_minutes" },
  { name: "Calories", value: "calories" },
];

const defaultComplicationsOptions = complicationsOptions.slice(0, 3);

/** Options for color pickers. */
export const colorOptions = [
  { color: "black" },
  { color: "silver" },
  { color: "gray" },
  { color: "white" },
  { color: "maroon" },
  { color: "red" },
  { color: "purple" },
  { color: "fuchsia" },
  { color: "green" },
  { color: "lime" },
  { color: "olive" },
  { color: "yellow" },
  { color: "navy" },
  { color: "blue" },
  { color: "teal" },
  { color: "aqua" },
];

export type TextAlignment = "start" | "middle" | "end";
export type TextCase = "upper" | "lower" | "capital" | "none";

/** Settings stored on the device in a file. */
export interface DeviceSettings {
  textAlignment: TextAlignment;
  textCase: TextCase;
  textColor: string;
  complications: ID[];
  complicationsColor: string;
  backgroundImage?: string;
  backgroundColor: string;
}

/** Settings stored on the companion in `settingsStorage`. */
export interface CompanionSettings {
  screenWidth: number;
  screenHeight: number;
  textAlignment: Select;
  textCase: Select;
  textColor: ColorSelect;
  complications: SelectValue[];
  complicationsColor: ColorSelect;
  backgroundImage?: ImagePicker;
  backgroundColor: ColorSelect;
}

/** Returns the default set of device settings. */
export const defaultDeviceSettings = (): DeviceSettings => ({
  textAlignment: "start",
  textCase: "none",
  textColor: "white",
  complications: defaultComplicationsOptions.map((o) => o.value) as ID[],
  complicationsColor: "white",
  backgroundColor: "black",
});

/** Returns the default set of companion settings. */
export const defaultCompanionSettings = (): CompanionSettings => ({
  // These are initialized in `companion/settings.ts`.
  screenWidth: 0,
  screenHeight: 0,
  textAlignment: {
    // Corresponds to 'left'.
    values: [textAlignmentOptions[0]],
    selected: [0],
  },
  textCase: {
    // Corresponds to 'none'.
    values: [textCaseOptions[3]],
    selected: [3],
  },
  textColor: "white",
  complications: defaultComplicationsOptions,
  complicationsColor: "white",
  backgroundColor: "black",
});

/**
 * Parses companion settings into device settings.
 *
 * @param companionSettings - The companion settings from `settingsStorage`.
 * @returns The parsed device settings.
 */
export function parseDeviceSettings(
  companionSettings: CompanionSettings,
): DeviceSettings {
  const textAlignment = getSelected(
    companionSettings.textAlignment,
  ) as TextAlignment;
  const textColor = getColorSelected(companionSettings.textColor);
  const textCase = getSelected(companionSettings.textCase) as TextCase;

  const complications = getAllSelected(companionSettings.complications) as ID[];
  const complicationsColor = getColorSelected(
    companionSettings.complicationsColor,
  );

  const backgroundImage = companionSettings.backgroundImage?.imageUri;
  const backgroundColor = getColorSelected(companionSettings.backgroundColor);

  return {
    textAlignment,
    textColor,
    textCase,
    complications,
    complicationsColor,
    backgroundImage,
    backgroundColor,
  };
}
