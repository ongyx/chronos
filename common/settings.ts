import { ID } from "../app/complications";

import { ImagePicker, Select, SelectValue } from "./jsx";

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
  { name: "Steps", value: "steps" },
  { name: "Heart Rate", value: "heart_rate" },
  { name: "Battery", value: "battery" },
  { name: "Active Zone Minutes", value: "active_zone_minutes" },
];

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

/** Settings stored on the device in a file. */
export interface DeviceSettings {
  textAlignment: "start" | "middle" | "end";
  textCase: "upper" | "lower" | "capital" | "none";
  textColor: string;
  complications: ID[];
  complicationsColor: string;
  backgroundImage: string;
  backgroundColor: string;
}

/** Settings stored on the companion in `settingsStorage`. */
export interface CompanionSettings {
  screenWidth: number;
  screenHeight: number;
  textAlignment: Select;
  textCase: Select;
  textColor: string;
  complications: SelectValue[];
  complicationsColor: string;
  backgroundImage?: ImagePicker;
  backgroundColor: string;
}

/** Returns the default set of device settings. */
export const defaultDeviceSettings = (): DeviceSettings => ({
  textAlignment: "start",
  textCase: "none",
  textColor: "white",
  complications: complicationsOptions.map((o) => o.value) as ID[],
  complicationsColor: "white",
  backgroundImage: "",
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
  // Enable all complications by default.
  complications: complicationsOptions,
  complicationsColor: "white",
  backgroundColor: "black",
});
