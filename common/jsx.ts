/** The result of a JSX `Select`. */
export type Select = {
  /** The value(s) selected. */
  values: {
    /** The name of the value as shown in the settings UI. */
    name: string;
    /** The actual value, if set in the JSX file. */
    value?: any;
  }[];
  /** The indexes of the value(s) selected. */
  selected: number[];
};

/** Returns the first selected value in the select. */
export function getSelected(select: Select): any {
  return select.values[0].value;
}

/** The result of a JSX `ImagePicker`. */
export type ImagePicker = {
  /** The Base64-encoded Image Data URI for the picked image. */
  imageUri: string;
  /** The dimensions of the picked image. */
  imageSize: {
    width: number;
    height: number;
  };
};

/** Returns the Image Data URI of the image picker. */
export function getImageUri(imagePicker: ImagePicker): string {
  return imagePicker.imageUri;
}
