import { render } from "../components/SvgLoader.bs.js";

// Same layering order as AvatarGenerator.res's getZIndex, lowest first so
// the array can be sorted straight into paint order. Background sits under
// everything; Accessories sit on top.
const Z_INDEX = {
  Background: 20,
  Skin: 30,
  Head: 40,
  Hair: 70,
  Body: 75,
  Mouth: 80,
  FacialHair: 90,
  Nose: 100,
  Eyes: 110,
  Accessories: 115,
};

// Every part.render() call returns a standalone `<svg ...>...</svg>` string
// sharing the same "0 0 64 64" viewBox (some, like BeardMustache, lead with
// an XML declaration). To compose them into a single SVG, unwrap the outer
// <svg> tag and keep only what it draws.
function innerMarkup(svgMarkup) {
  const stripped = svgMarkup.replace(/^\s*<\?xml[^>]*\?>/, "");
  const match = stripped.match(/^\s*<svg[^>]*>([\s\S]*)<\/svg>\s*$/);
  return match ? match[1] : "";
}

// Assemble the selected parts (Types.setting[] — id, selectedStyle,
// selectedColor) into one standalone SVG string. Reuses SvgLoader.render,
// the same renderer AvatarGenerator.res draws on screen with, so the
// exported file always matches what the user sees. The background is just
// another selected part (id: Background), so its chosen color is carried
// through like every other part's color.
export default function assembleSvg(settings, size = 512) {
  const layers = [...settings]
    .sort((a, b) => (Z_INDEX[a.id] ?? 0) - (Z_INDEX[b.id] ?? 0))
    .map((part) =>
      innerMarkup(render(part.selectedStyle, `#${part.selectedColor}`, "64")),
    )
    .filter(Boolean)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">${layers}</svg>`;
}
