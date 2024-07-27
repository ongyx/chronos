import { ImagePicker, Select } from "./jsx";

/** Options for text alignment. */
export const textAlignmentOptions = [
  { name: "Left", value: "start" },
  { name: "Center", value: "middle" },
  { name: "Right", value: "end" },
];

/** Options for text color. */
export const textColorOptions = [
  { color: "black" },
  { color: "darkslategrey" },
  { color: "dimgrey" },
  { color: "grey" },
  { color: "lightgrey" },
  { color: "beige" },
  { color: "white" },
  { color: "maroon" },
  { color: "saddlebrown" },
  { color: "darkgoldenrod" },
  { color: "goldenrod" },
  { color: "rosybrown" },
  { color: "wheat" },
  { color: "navy" },
  { color: "blue" },
  { color: "dodgerblue" },
  { color: "deepskyblue" },
  { color: "aquamarine" },
  { color: "cyan" },
  { color: "olive" },
  { color: "darkgreen" },
  { color: "green" },
  { color: "springgreen" },
  { color: "limegreen" },
  { color: "palegreen" },
  { color: "lime" },
  { color: "greenyellow" },
  { color: "darkslateblue" },
  { color: "slateblue" },
  { color: "purple" },
  { color: "fuchsia" },
  { color: "plum" },
  { color: "orchid" },
  { color: "lavender" },
  { color: "darkkhaki" },
  { color: "khaki" },
  { color: "lemonchiffon" },
  { color: "yellow" },
  { color: "gold" },
  { color: "orangered" },
  { color: "orange" },
  { color: "coral" },
  { color: "lightpink" },
  { color: "palevioletred" },
  { color: "deeppink" },
  { color: "darkred" },
  { color: "crimson" },
  { color: "red" }
];

/** Settings stored on the device in a file. */
export interface DeviceSettings {
  textAlignment: "start" | "middle" | "end",
  textColor: string,
  backgroundImage: string,
}

/** Settings stored on the companion in `settingsStorage`. */
export interface CompanionSettings {
  screenWidth: number,
  screenHeight: number,
  textAlignment: Select,
  textColor: string,
  backgroundImage?: ImagePicker,
}

/** Returns he default set of device settings. */
export const defaultDeviceSettings = (): DeviceSettings => ({
  textAlignment: "start",
  textColor: "white",
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
  },
  textColor: "white",
})

