%%raw(`import "./Styler.css"`)

@module("../helpers/fitSvg.js")
external fitSvg: (Js.Nullable.t<Dom.element>, int) => unit = "default"

type state = {index: int}

type action =
  | Increment
  | Decrement

@react.component
let make = (
  ~id: Types.id,
  ~label,
  ~colors,
  ~styles,
  ~selectedColor,
  ~selectedStyle,
  ~onSelectColor,
  ~onSelectStyle,
) => {
  let (_, dispatch) = React.useReducer((state, action) =>
    switch action {
    | Increment =>
      let inc = Belt.Array.length(styles) - 1 > state.index ? 1 : -Belt.Array.length(styles) + 1
      let index = state.index + inc
      let style = styles[index]
      onSelectStyle(style)
      {index: index}
    | Decrement =>
      let inc = state.index > 0 ? 1 : -Belt.Array.length(styles) + 1
      let index = state.index - inc
      let style = styles[index]
      onSelectStyle(style)
      {index: index}
    }
  , {index: 0})

  let colorSwatches = switch id {
  // The nose takes the skin colour on the face. Giving it a palette of its own
  // would let the nose drift away from the face it sits on. An empty swatch
  // area reads as broken, so say why it is empty instead.
  | #Nose =>
    <span className="Styler-note"> {React.string("Follows the skin colour")} </span>
  | _ =>
    <>
      {Belt.Array.map(colors, color =>
        <ColorSwatch
          key=color
          value=color
          disabled={color === "#EEEFF5"}
          selected={color === selectedColor}
          onSelect={value => onSelectColor(value)}
        />
      )->React.array}
      <input
        type_="color"
        className="ColorSwatch ColorSwatch--picker"
        title="Pick a custom color"
        value={"#" ++ selectedColor}
        onChange={e => {
          let value: string = (e->ReactEvent.Form.target)["value"]
          onSelectColor(value->Js.String2.sliceToEnd(~from=1)->Js.String2.toUpperCase)
        }}
      />
    </>
  }
  let image = <SvgLoader fill={"#" ++ selectedColor} name=selectedStyle />

  let showLeftArrow =
    Belt.Array.length(styles) > 1
      ? <button className="Styler-btn" onClick={_ => dispatch(Decrement)}>
          <img className="Styler-arrow" src="/images/arrow.svg" />
        </button>
      : <div />

  let showRightArrow =
    Belt.Array.length(styles) > 1
      ? <button className="Styler-btn" onClick={_ => dispatch(Increment)}>
          <img className="Styler-arrow Styler-arrow--right" src="/images/arrow.svg" />
        </button>
      : <div />

  // Eyes, nose, mouth and accessories are drawn at true scale inside the face,
  // so they show as specks in a preview tile. Fit these four to their drawn
  // bounds. The rest read fine at their natural size.
  let needsFit = switch id {
  | #Eyes | #Nose | #Mouth | #Accessories => true
  | _ => false
  }
  let modelRef = React.useRef(Js.Nullable.null)
  React.useEffect2(() => {
    if needsFit {
      fitSvg(modelRef.current, 4)
    }
    None
  }, (selectedStyle, selectedColor))

  let showImage = switch id {
  | #Background => React.null
  | _ =>
    <div
      ref={ReactDOM.Ref.domRef(modelRef)}
      className={` Styler-model svg-${(id :> string)} `}>
      image
    </div>
  }

  <div className="Styler-container">
    <span className="Styler-label"> {React.string(label)} </span>
    <div className="Styler-picker">
      showLeftArrow
      showImage
      showRightArrow
    </div>
    <div className="Styler-colors"> colorSwatches </div>
  </div>
}
