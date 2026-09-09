%%raw(`import "./Presets.css"`)

// A row of ready-made looks shown above the pickers. Each thumbnail is the same
// stacked-SVG face the generator renders, drawn small; clicking one replaces the
// current avatar with that preset's styles. The pickers and Randomize keep
// working exactly as before — this only offers a faster starting point.
//
// getZIndex is passed in rather than imported so this component does not depend
// on AvatarGenerator (which renders it), keeping the module graph acyclic.
@react.component
let make = (
  ~presets: array<Types.preset>,
  ~settingsFor: Types.styles => array<Types.setting>,
  ~onSelect: Types.styles => unit,
  ~getZIndex: Types.id => string,
) =>
  Belt.Array.length(presets) === 0
    ? React.null
    : <div className="Presets-container">
        <span className="Presets-heading Text-overline"> {React.string("Start from a look")} </span>
        <div className="Presets-row">
          {Belt.Array.map(presets, preset => {
            let features = Belt.Array.map(settingsFor(preset.styles), o =>
              <SvgLoader
                key=o.label
                style={{zIndex: getZIndex(o.id)}}
                className="Presets-feature"
                name=o.selectedStyle
                fill={"#" ++ o.selectedColor}
                size="48"
              />
            )
            <button
              key=preset.name
              type_="button"
              className="Presets-item"
              title=preset.name
              ariaLabel={"Apply the " ++ preset.name ++ " preset"}
              onClick={_ => onSelect(preset.styles)}>
              <div className="Presets-thumb"> {React.array(features)} </div>
            </button>
          })->React.array}
        </div>
      </div>
