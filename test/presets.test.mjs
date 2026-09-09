// Contract tests for the presets module. Presets reuse the URL parameter names,
// so a preset is only valid if every style value exists in config.json and every
// colour is a 6-digit hex — the exact rules a share link is held to. These tests
// guard against a typo in a preset silently degrading to the base look.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { PRESETS, presetStyles, resolvePresets } from "../src/helpers/presets.js";
import { encodeStylesToCode, decodeCodeToStyles } from "../src/helpers/shareUrl.js";

const config = JSON.parse(
  readFileSync(new URL("../src/data/config.json", import.meta.url)),
);

const HEX = /^[0-9A-Fa-f]{6}$/;

// Map each URL parameter name to the config list it must belong to (styles), or
// null for colours which are validated as hex instead.
const STYLE_LIST = {
  hair: "hairStyles",
  facialHair: "facialHairStyles",
  body: "bodyStyles",
  eyes: "eyeStyles",
  mouth: "mouthStyles",
  nose: "noseStyles",
  accessories: "accessoryStyles",
};
const COLOR_KEYS = [
  "skinColor",
  "eyesColor",
  "mouthColor",
  "hairColor",
  "facialHairColor",
  "bodyColor",
  "accessoriesColor",
  "bgColor",
];

test("there are exactly 8 presets, each uniquely named", () => {
  assert.equal(PRESETS.length, 8);
  const names = new Set(PRESETS.map((p) => p.name));
  assert.equal(names.size, 8);
});

test("every preset style value exists in config", () => {
  for (const preset of PRESETS) {
    for (const [key, listKey] of Object.entries(STYLE_LIST)) {
      const value = preset.params[key];
      assert.ok(
        config[listKey].includes(value),
        `${preset.name}: ${key}="${value}" is not in config.${listKey}`,
      );
    }
  }
});

test("every preset colour is a 6-digit hex", () => {
  for (const preset of PRESETS) {
    for (const key of COLOR_KEYS) {
      const value = preset.params[key];
      assert.match(value, HEX, `${preset.name}: ${key}="${value}" is not hex`);
    }
  }
});

test("presetStyles resolves to a complete, validated styles record", () => {
  for (const preset of PRESETS) {
    const styles = presetStyles(config, preset.params);
    // Fields no URL param controls, supplied by the base.
    assert.equal(styles.skin, "Skin");
    assert.equal(styles.head, "Head");
    // Each param survives resolution (nothing dropped as invalid), with colours
    // upper-cased exactly as the URL reader normalises them.
    for (const key of Object.keys(STYLE_LIST)) {
      assert.equal(styles[key], preset.params[key]);
    }
    for (const key of COLOR_KEYS) {
      assert.equal(styles[key], preset.params[key].toUpperCase());
    }
  }
});

test("an invalid value is rejected rather than passed through", () => {
  // The base defines no hair, so a rejected hair leaves it unset — proof the
  // value was validated out, never interpolated into markup.
  const resolved = presetStyles(config, { hair: "NotARealHair", skinColor: "zzzzzz" });
  assert.equal(resolved.hair, undefined);
  assert.equal(resolved.skinColor, undefined);
  // A valid sibling in the same call still applies.
  const mixed = presetStyles(config, { hair: "NotARealHair", body: "Round" });
  assert.equal(mixed.body, "Round");
});

test("resolvePresets pairs each name with its resolved styles", () => {
  const resolved = resolvePresets(config);
  assert.equal(resolved.length, PRESETS.length);
  resolved.forEach((entry, i) => {
    assert.equal(entry.name, PRESETS[i].name);
    assert.equal(entry.styles.bgColor, PRESETS[i].params.bgColor.toUpperCase());
  });
});

// Every field the nine pickers read from a styles record. App.res builds one
// setting per picker straight off these fields, so a preset that leaves any of
// them unset would land a picker on the random base look instead of the preset.
// (`head` carries no picker; the Background picker's style is the fixed literal
// "Background", so only its bgColor field is listed.)
const PICKER_FIELDS = [
  "skin",
  "skinColor",
  "hair",
  "hairColor",
  "facialHair",
  "facialHairColor",
  "body",
  "bodyColor",
  "eyes",
  "eyesColor",
  "mouth",
  "mouthColor",
  "nose",
  "accessories",
  "accessoriesColor",
  "bgColor",
];

test("selecting a preset fills every picker — none falls back to the base", () => {
  // Applying a preset replaces the whole styles record (Index.res onSelectPreset),
  // so every picker reflects the preset only if the resolved record defines a value
  // for each picker-backed field. An undefined here is a picker showing the old look.
  for (const preset of PRESETS) {
    const styles = presetStyles(config, preset.params);
    for (const field of PICKER_FIELDS) {
      assert.ok(
        styles[field] !== undefined && styles[field] !== "",
        `${preset.name}: picker field "${field}" is unset`,
      );
    }
  }
});

test("the share link reproduces each preset (encode → decode is identity)", () => {
  // The share link is the compact code shortShareUrl builds from the current
  // styles. Reproducing a preset means decoding that code yields byte-for-byte the
  // same styles that were applied — the round-trip every share link relies on.
  for (const preset of PRESETS) {
    const styles = presetStyles(config, preset.params);
    const code = encodeStylesToCode(config, styles);
    assert.ok(code, `${preset.name}: styles did not encode to a share code`);
    const decoded = decodeCodeToStyles(config, code);
    assert.ok(decoded, `${preset.name}: share code "${code}" did not decode`);
    assert.deepEqual(
      decoded,
      styles,
      `${preset.name}: share code did not reproduce the preset`,
    );
  }
});

test("presets are balanced across skin tones and accessories", () => {
  const skinTones = new Set(PRESETS.map((p) => p.params.skinColor));
  assert.ok(skinTones.size >= 6, "expected a varied spread of skin tones");
  const accessories = new Set(PRESETS.map((p) => p.params.accessories));
  assert.ok(accessories.size >= 2, "expected a mix of accessory choices");
});
