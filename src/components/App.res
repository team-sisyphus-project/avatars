@react.component
let make = (
  ~showModal,
  ~onToggleModal,
  ~onExport,
  ~onChange,
  ~randomize,
  ~shareUrl: string,
  ~styles: Types.styles,
  ~config: Types.config,
  ~presets: array<Types.preset>,
  ~onSelectPreset: Types.styles => unit,
) => {
  // Map a styles record onto the per-feature settings the avatar renders from.
  // Used for the live avatar and, via AvatarGenerator, for each preset thumbnail.
  let buildSettings = (styles: Types.styles): array<Types.setting> => [
    {
      id: #Skin,
      label: "SKIN",
      colors: config.skinColors,
      styles: config.skinStyles,
      selectedColor: styles.skinColor,
      selectedStyle: styles.skin,
    },
    {
      id: #Hair,
      label: "HAIR",
      colors: config.hairColors,
      styles: config.hairStyles,
      selectedColor: styles.hairColor,
      selectedStyle: styles.hair,
    },
    {
      id: #FacialHair,
      label: "FACIAL HAIR",
      colors: config.facialHairColors,
      styles: config.facialHairStyles,
      selectedColor: styles.facialHairColor,
      selectedStyle: styles.facialHair,
    },
    {
      id: #Body,
      label: "BODY",
      colors: config.bodyColors,
      styles: config.bodyStyles,
      selectedColor: styles.bodyColor,
      selectedStyle: styles.body,
    },
    {
      id: #Eyes,
      label: "EYES",
      colors: config.eyeColors,
      styles: config.eyeStyles,
      selectedColor: styles.eyesColor,
      selectedStyle: styles.eyes,
    },
    {
      id: #Mouth,
      label: "MOUTH",
      colors: config.mouthColors,
      styles: config.mouthStyles,
      selectedColor: styles.mouthColor,
      selectedStyle: styles.mouth,
    },
    {
      id: #Nose,
      label: "NOSE",
      colors: config.disabledColors,
      styles: config.noseStyles,
      selectedColor: styles.skinColor,
      selectedStyle: styles.nose,
    },
    {
      id: #Accessories,
      label: "ACCESSORIES",
      colors: config.accessoryColors,
      styles: config.accessoryStyles,
      selectedColor: styles.accessoriesColor,
      selectedStyle: styles.accessories,
    },
    {
      id: #Background,
      label: "BACKGROUND",
      colors: config.bgColors,
      styles: config.bgStyles,
      selectedColor: styles.bgColor,
      selectedStyle: "Background",
    },
  ]
  let settings = buildSettings(styles)
  <>
    <div className="body-bg-left" />
    <div className="body-bg-right" />
    <header className="Layout-header">
      <div className="Layout-left">
        <Wordmark placement="header-wordmark" />
        <h1 className="Text-title"> {React.string("Avatars")} </h1>
        <span className="Text-subtitle"> {React.string("Autosquad Avatar Generator")} </span>
      </div>
      <div className="Layout-right">
        <h2 className="Text-description">
          {React.string("Build a face for every squad member. Mix, match, and download.")}
        </h2>
      </div>
    </header>
    <main className="Layout-main">
      <AvatarGenerator
        onChange
        onExport
        randomize
        settings
        presets
        settingsFor=buildSettings
        onSelectPreset
      />
    </main>
    <footer className="Layout-footer">
      <div className="Layout-left">
        <span className="Text-overline"> {React.string("Made with")} </span>
        <br />
        <Wordmark placement="footer-wordmark" />
      </div>
      <div className="Layout-right">
        <span className="Text-marketing mb-2">
          {React.string("Ship software with squads of agents that plan, build, and review together.")}
        </span>
        <br />
        <IconLink
          href="https://autosquad.co"
          title="Autosquad — build software with agent squads"
          label="autosquad.co"
          icon="arrow"
        />
      </div>
    </footer>
    <div style={{textAlign: "center", marginBottom: "36px"}}>
      <Button href="https://github.com/cclss/autosquad-avatars" label="View on Github" />
    </div>
    <Modal visible=showModal onToggle=onToggleModal shareUrl />
  </>
}
