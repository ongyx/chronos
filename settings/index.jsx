registerSettingsPage(({ settings }) => (
  <Page>
    <Section title={<Text bold align="center">Chronos Settings</Text>}>
      <Select
        label={`Text Alignment`}
        settingsKey="textAlignment"
        options={[
          {name: "Left", value: "left"},
          {name: "Right", value: "right"},
        ]}
      />
    </Section>
  </Page>
));
