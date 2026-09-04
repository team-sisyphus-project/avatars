%%raw(`import "./Modal.css"`)

@val @scope(("navigator", "clipboard"))
external writeText: string => promise<unit> = "writeText"

@react.component
let make = (~visible, ~onToggle, ~shareUrl: string) => {
  let (copied, setCopied) = React.useState(_ => false)

  let copyLink = _ => {
    writeText(shareUrl)->ignore
    setCopied(_ => true)
    let _ = Js.Global.setTimeout(() => setCopied(_ => false), 2000)
  }

  !visible
    ? React.null
    : <>
        <div onClick=onToggle className="Modal-overlay" />
        <div className="Modal-container">
          <button onClick=onToggle className="Modal-close">
            <img width="18" height="18" className="Modal-close--icon" src="/images/close.svg" />
          </button>
          <h3 className="Modal-title"> {React.string("Enjoy your avatar!")} </h3>
          <span className="Modal-subtitle">
            {React.string(
              "Share it with your friends and see what ridiculousness they come up with!",
            )}
          </span>
          <div className="Modal-buttons">
            <a
              target="_blank"
              rel="no-follow"
              href={"https://twitter.com/intent/tweet?text=I+made+this+avatar&url=" ++
              Js.Global.encodeURIComponent(shareUrl) ++ ""}
              className="Modal-button Modal-button--twitter">
              <img className="Modal-shareIcon" width="16" height="16" src="/images/twitter.svg" />
              <span> {React.string("Twitter")} </span>
            </a>
            <button onClick=copyLink className="Modal-button Modal-button--copy">
              <span> {React.string(copied ? "Copied!" : "Copy Link")} </span>
            </button>
          </div>
        </div>
      </>
}
