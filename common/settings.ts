import { ImagePicker, Select } from "./jsx";

/** Options for text alignment. */
export const textAlignmentOptions = [
  { name: "Left", value: "start" },
  { name: "Center", value: "middle" },
  { name: "Right", value: "end" },
];

/** Options for clock granularity. */
export const clockGranularityOptions = [
  { name: "Minutes", value: "minutes" },
  { name: "Seconds", value: "seconds" },
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
  textColor: string;
  backgroundImage: string;
  backgroundColor: string;
  clockGranularity: "minutes" | "seconds";
}

/** Settings stored on the companion in `settingsStorage`. */
export interface CompanionSettings {
  screenWidth: number;
  screenHeight: number;
  textAlignment: Select;
  textColor: string;
  backgroundImage?: ImagePicker;
  backgroundColor?: string;
  clockGranularity: Select;
}

/** Returns he default set of device settings. */
export const defaultDeviceSettings = (): DeviceSettings => ({
  textAlignment: "start",
  textColor: "white",
  backgroundImage: "",
  backgroundColor: "black",
  clockGranularity: "minutes",
});

/** Returns the default set of companion settings. */
export const defaultCompanionSettings = (): CompanionSettings => ({
  // These are initialized in `companion/settings.ts`.
  screenWidth: 0,
  screenHeight: 0,
  textAlignment: {
    values: [textAlignmentOptions[0]],
    selected: [0],
  },
  textColor: "white",
  clockGranularity: {
    values: [clockGranularityOptions[0]],
    selected: [0],
  },
});
