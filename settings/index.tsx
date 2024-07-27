import { textAlignmentOptions, colorOptions } from "../common/settings";
import { version } from "../common/version";

function suggestColor(input: string): {name: string, value: string}[] {
  const colors = colorOptions
    .filter(o => o.color.startsWith(input))
    .map(o => ({name: o.color, value: o.color}));

  return colors.length !== 0 ? colors : [{name: input, value: input}];
}

function settingsPage(props: SettingsComponentProps) {
  const screenWidth = props.settingsStorage.getItem("screenWidth")!;
  const screenHeight = props.settingsStorage.getItem("screenHeight")!;

  return <Page>
    <Section title="Text">
      <Select
        label="Alignment"
        settingsKey="textAlignment"
        options={textAlignmentOptions}
      />

      <TextInput
        label="Color"
        placeholder="Enter a valid CSS color..."
        settingsKey="textColor"
        onAutocomplete={suggestColor}
      />

      <ColorSelect
        colors={colorOptions}
        settingsKey="textColor"
      />
    </Section>

    <Section title="Background">
      <ImagePicker
        label="Image (Tap here to pick one)"
        settingsKey="backgroundImage"
        imageWidth={screenWidth}
        imageHeight={screenHeight}
      />

      <Button
        label="Remove Image"
        onClick={() => props.settingsStorage.setItem("backgroundImage", JSON.stringify(""))}
      />

      <TextInput
        label="Color"
        placeholder="Enter a valid CSS color..."
        settingsKey="backgroundColor"
        onAutocomplete={suggestColor}
      />

      <ColorSelect
        colors={colorOptions}
        settingsKey="backgroundColor"
      />
    </Section>

    <Button
      label="Reset Settings (this cannot be undone!)"
      onClick={() => props.settingsStorage.clear()}
    />

    <Section title="About">
      <Text bold={true} align={"center"}>Chronos v{version}</Text>

      <Text>        
        Made with &#x2665;&#xfe0f; by Ong Yong Xin.
        The source code is available <Link source="https://github.com/ongyx/chronos">here</Link>.
      </Text>
    </Section>
  </Page>
}

registerSettingsPage(settingsPage);
