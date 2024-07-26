registerSettingsPage(({ settings }) => (
  <Page>
    <Section title={<Text bold align="center">Chronos Settings</Text>}>
      <Select
        label={`Text Alignment`}
        settingsKey="textAlignment"
        options={[
          {name: "Left", value: "start"},
          {name: "Center", value: "middle"},
          {name: "Right", value: "end"},
        ]}
      />
    </Section>
  </Page>
));
