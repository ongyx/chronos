import { textAlignmentOptions } from "../common/settings";

function settingsPage(props: SettingsComponentProps) {
  const screenWidth = props.settingsStorage.getItem("screenWidth")!;
  const screenHeight = props.settingsStorage.getItem("screenHeight")!;

  return <Page>
    <Select
      title=""
      label="Text Alignment"
      settingsKey="textAlignment"
      options={textAlignmentOptions}
    />

    <ImagePicker
      label="Background Image"
      description="Choose a background image to show."
      settingsKey="backgroundImage"
      imageWidth={screenWidth}
      imageHeight={screenHeight}
    />

    <Button
      label="Reset settings (this cannot be undone!)"
      onClick={() => props.settingsStorage.clear()}
    />
  </Page>
}

registerSettingsPage(settingsPage);
