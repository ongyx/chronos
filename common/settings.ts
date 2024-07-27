import { ImagePicker, Select } from "./jsx";

/** Options for text alignment. */
export const textAlignmentOptions = [
  { name: "Left", value: "start" },
  { name: "Center", value: "middle" },
  { name: "Right", value: "end" },
];

/** Settings stored on the device in a file. */
export interface DeviceSettings {
  textAlignment: "start" | "middle" | "end",
  backgroundImage: string,
}

/** Settings stored on the companion in `settingsStorage`. */
export interface CompanionSettings {
  screenWidth: number,
  screenHeight: number,
  textAlignment: Select,
  backgroundImage?: ImagePicker,
}

/** Returns he default set of device settings. */
export const defaultDeviceSettings = (): DeviceSettings => ({
  textAlignment: "start",
  backgroundImage: "",
})

/** Returns the default set of companion settings. */
export const defaultCompanionSettings = (): CompanionSettings => ({
  // These are initialized in `companion/settings.ts`.
  screenWidth: 0,
  screenHeight: 0,
  textAlignment: {
    values: [textAlignmentOptions[0]],
    selected: [0],
  }
})

