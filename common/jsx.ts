/** A selected value in a JSX `Select`. */
export type SelectValue = {
  /** The name of the value as shown in the settings UI. */
  name: string;
  /** The actual value, if set in the JSX file. */
  value?: string;
};

/** The result of a JSX `Select`. */
export type Select = {
  /** The value(s) selected. */
  values: SelectValue[];
  /** The indexes of the value(s) selected. */
  selected: number[];
};

/** Returns the first selected value in the select. */
export function getSelected(select: Select): string {
  const selectValue = select.values[0];

  return selectValue.value ?? selectValue.name;
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

/** The result of a JSX `AdditiveList` with an embedded `Select`. */
export type AdditiveListSelect = SelectValue[];

/** Returns all selected values from the additive list. */
export function getAllSelected(als: AdditiveListSelect): string[] {
  return als.map((sv) => sv.value ?? sv.name);
}
