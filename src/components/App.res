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
) => {
  let settings: array<Types.setting> = [
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
  <>
    <div className="body-bg-left" />
    <div className="body-bg-right" />
    <header className="Layout-header">
      <div className="Layout-left">
        <h1 className="Text-title"> {React.string("Avatars")} </h1>
        <span className="Text-subtitle"> {React.string("Avatar Generator")} </span>
      </div>
      <div className="Layout-right">
        <h2 className="Text-description">
          {React.string("Build a face for every squad member. Mix, match, and download.")}
        </h2>
      </div>
    </header>
    <main className="Layout-main">
      <AvatarGenerator onChange onExport randomize settings />
    </main>
    <footer className="Layout-footer">
      <span className="Text-marketing">
        {React.string("Ship software with squads of agents that plan, build, and review together.")}
      </span>
    </footer>
    <Modal visible=showModal onToggle=onToggleModal shareUrl />
  </>
}
