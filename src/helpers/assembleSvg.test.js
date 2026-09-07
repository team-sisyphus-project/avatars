import { describe, expect, it } from "vitest";
import assembleSvg from "./assembleSvg.js";

// Minimal Types.setting-shaped fixtures (id, selectedStyle, selectedColor —
// the fields assembleSvg actually reads).
const background = {
  id: "Background",
  selectedStyle: "Background",
  selectedColor: "FF0000",
};
const skin = { id: "Skin", selectedStyle: "Skin", selectedColor: "AA5500" };
const eyes = { id: "Eyes", selectedStyle: "Open", selectedColor: "000000" };
const accessoriesNone = {
  id: "Accessories",
  selectedStyle: "None",
  selectedColor: "000000",
};

describe("assembleSvg", () => {
  it("returns a single standalone SVG string with a viewBox", () => {
    const svg = assembleSvg([background, skin, eyes]);

    expect(svg).toMatch(/^<svg[^>]*>[\s\S]*<\/svg>$/);
    expect(svg).toContain('viewBox="0 0 64 64"');
    // Exactly one root <svg> — parts are unwrapped, not nested.
    expect(svg.match(/<svg/g)).toHaveLength(1);
  });

  it("includes the chosen background color", () => {
    const svg = assembleSvg([background, skin]);

    expect(svg).toContain("#FF0000");
  });

  it("includes every selected part's color", () => {
    const svg = assembleSvg([background, skin, eyes]);

    expect(svg).toContain("#AA5500");
    expect(svg).toContain("#000000");
  });

  it("layers parts in on-screen z-index order regardless of input order", () => {
    const forward = assembleSvg([background, skin, eyes]);
    const shuffled = assembleSvg([eyes, background, skin]);

    // Background is drawn first (lowest z-index) either way.
    expect(forward.indexOf("#FF0000")).toBeLessThan(forward.indexOf("#AA5500"));
    expect(shuffled.indexOf("#FF0000")).toBeLessThan(
      shuffled.indexOf("#AA5500"),
    );
    expect(forward).toEqual(shuffled);
  });

  it("omits parts with no matching style (e.g. an unset accessory)", () => {
    const withNone = assembleSvg([background, skin, accessoriesNone]);
    const without = assembleSvg([background, skin]);

    expect(withNone).toEqual(without);
  });

  it("sizes the root svg while keeping the part coordinate space fixed", () => {
    const svg = assembleSvg([background], 128);

    expect(svg).toContain('width="128"');
    expect(svg).toContain('height="128"');
    expect(svg).toContain('viewBox="0 0 64 64"');
  });

  it("defaults to a 512 export size", () => {
    const svg = assembleSvg([background]);

    expect(svg).toContain('width="512"');
    expect(svg).toContain('height="512"');
  });

  it("includes parts whose markup leads with an XML declaration", () => {
    // BeardMustache's renderer emits `<?xml version="1.0" ...?>` before its
    // <svg> tag, unlike every other part.
    const facialHair = {
      id: "FacialHair",
      selectedStyle: "BeardMustache",
      selectedColor: "112233",
    };
    const svg = assembleSvg([background, skin, facialHair]);

    expect(svg).toContain("#112233");
    expect(svg).not.toContain("<?xml");
    expect(svg.match(/<svg/g)).toHaveLength(1);
  });
});
