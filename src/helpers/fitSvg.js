// Fit a feature preview to what it actually draws.
//
// Eyes, mouth and nose are drawn inside the full 64x64 face, at their real
// position and real size. That is correct on the face, but a preview tile
// showing one feature alone then renders it as a speck: measured, the mouth
// occupies 3.4 units of 64 and the nose 4.6.
//
// So measure the drawn bounds and set the viewBox to them. Sizes differ per
// style (sunglasses are far wider than open eyes), so measure every time
// rather than applying a fixed zoom. The face itself never calls this, so the
// avatar is untouched.
//
// Faint overlays are excluded from the measurement. The nose ships a shadow
// nearly twice its own width (14x7 at 0.119 opacity against a 7.9x5 nose);
// including it shrinks the nose and leaves pale wings on either side.
const FAINT = 0.25;

function isFaint(node) {
  const fillOpacity = parseFloat(node.getAttribute("fill-opacity"));
  const opacity = parseFloat(node.getAttribute("opacity"));
  if (!Number.isNaN(fillOpacity) && fillOpacity < FAINT) return true;
  if (!Number.isNaN(opacity) && opacity < FAINT) return true;
  return false;
}

export default function fitSvg(container, pad) {
  if (!container) return;
  const svg = container.querySelector("svg");
  if (!svg) return;

  // Only shapes that actually get painted
  const shapes = [...svg.querySelectorAll("path,circle,ellipse,rect,polygon")].filter(
    (node) => node.getAttribute("fill") !== "none" && !isFaint(node)
  );

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const node of shapes) {
    let box;
    try {
      box = node.getBBox();
    } catch (e) {
      continue; // not laid out yet
    }
    if (!box || !box.width || !box.height) continue;
    minX = Math.min(minX, box.x);
    minY = Math.min(minY, box.y);
    maxX = Math.max(maxX, box.x + box.width);
    maxY = Math.max(maxY, box.y + box.height);
  }

  // Nothing painted (an empty style such as "None"): leave the viewBox alone
  if (!Number.isFinite(minX) || maxX <= minX || maxY <= minY) return;

  const padding = typeof pad === "number" ? pad : 2;
  const x = minX - padding;
  const y = minY - padding;
  const width = maxX - minX + padding * 2;
  const height = maxY - minY + padding * 2;

  svg.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
}
