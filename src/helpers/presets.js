// Curated starting looks, stored as URL parameter sets — the exact names the
// share links use (?hair=...&skinColor=...). Applying a preset is identical to
// opening its share URL, so presets ride on the same contract as sharing and
// stay in sync with it for free.
//
// The set is balanced on purpose — skin tones span light to dark (plus the two
// playful mint/lavender tones), hair styles are all different, and accessories
// mix "None", one earring and a pair — so the thumbnail row reads as a varied
// gallery at a glance rather than eight variations of one face.
//
// Every value must exist in config.json (styles) or be a 6-digit hex (colors).
// presetStyles validates each one exactly as a share link is validated, so a
// value that ever falls out of config degrades to the base look instead of
// rendering broken markup.

import { overlayParams } from "./shareUrl.js";

export const PRESETS = [
  {
    name: "Sunny",
    params: {
      skinColor: "FFCC22",
      hair: "Buzzcut",
      hairColor: "362C47",
      facialHair: "None",
      facialHairColor: "362C47",
      body: "Round",
      bodyColor: "F3B63A",
      eyes: "Happy",
      eyesColor: "1B0640",
      mouth: "Bigsmile",
      mouthColor: "E24553",
      nose: "Smallround",
      accessories: "None",
      accessoriesColor: "F3B63A",
      bgColor: "FFCC65",
    },
  },
  {
    name: "Rosewood",
    params: {
      skinColor: "B16A5B",
      hair: "Long",
      hairColor: "6C4545",
      facialHair: "None",
      facialHairColor: "6C4545",
      body: "Hoodie",
      bodyColor: "F55D81",
      eyes: "Open",
      eyesColor: "4E3B2A",
      mouth: "Smile",
      mouthColor: "8C3B4A",
      nose: "Mediumround",
      accessories: "Earrings",
      accessoriesColor: "F55D81",
      bgColor: "FF7A9A",
    },
  },
  {
    name: "Cobalt",
    params: {
      skinColor: "FBD2C7",
      hair: "Mohawk",
      hairColor: "4E7DE0",
      facialHair: "Goatee",
      facialHairColor: "4E7DE0",
      body: "Square",
      bodyColor: "456DFF",
      eyes: "Sunglasses",
      eyesColor: "2F4858",
      mouth: "Smirk",
      mouthColor: "362C47",
      nose: "Pointed",
      accessories: "Earring",
      accessoriesColor: "456DFF",
      bgColor: "93A7FF",
    },
  },
  {
    name: "Meadow",
    params: {
      skinColor: "E4A070",
      hair: "Curlybun",
      hairColor: "58B368",
      facialHair: "None",
      facialHairColor: "58B368",
      body: "Oval",
      bodyColor: "6DBB58",
      eyes: "Wink",
      eyesColor: "58B368",
      mouth: "Grin",
      mouthColor: "E24553",
      nose: "Button",
      accessories: "None",
      accessoriesColor: "54D7C7",
      bgColor: "A9E775",
    },
  },
  {
    name: "Violet",
    params: {
      skinColor: "C4B5F2",
      hair: "Bobcut",
      hairColor: "675E97",
      facialHair: "None",
      facialHairColor: "675E97",
      body: "Stripes",
      bodyColor: "7555CA",
      eyes: "Hearts",
      eyesColor: "7555CA",
      mouth: "Lips",
      mouthColor: "F55D81",
      nose: "Smallround",
      accessories: "Earrings",
      accessoriesColor: "5A45FF",
      bgColor: "B379F7",
    },
  },
  {
    name: "Umber",
    params: {
      skinColor: "7A4536",
      hair: "Fade",
      hairColor: "362C47",
      facialHair: "BeardMustache",
      facialHairColor: "362C47",
      body: "Checkered",
      bodyColor: "3E4E7C",
      eyes: "Open",
      eyesColor: "1B0640",
      mouth: "Smile",
      mouthColor: "6C4545",
      nose: "Mediumround",
      accessories: "None",
      accessoriesColor: "362C47",
      bgColor: "6C7BC4",
    },
  },
  {
    name: "Mint",
    params: {
      skinColor: "C9E6DC",
      hair: "Pigtails",
      hairColor: "5AC4D4",
      facialHair: "None",
      facialHairColor: "5AC4D4",
      body: "Round",
      bodyColor: "54D7C7",
      eyes: "Happy",
      eyesColor: "5AC4D4",
      mouth: "Bigsmile",
      mouthColor: "F57B98",
      nose: "Smallround",
      accessories: "Earring",
      accessoriesColor: "54D7C7",
      bgColor: "89E6E4",
    },
  },
  {
    name: "Ember",
    params: {
      skinColor: "E58F7B",
      hair: "Beanie",
      hairColor: "E15C66",
      facialHair: "Shadow",
      facialHairColor: "6C4545",
      body: "Hoodie",
      bodyColor: "FF8A5C",
      eyes: "Sleepy",
      eyesColor: "4E3B2A",
      mouth: "Whistle",
      mouthColor: "B14A5B",
      nose: "Wrinkles",
      accessories: "None",
      accessoriesColor: "F3B63A",
      bgColor: "FFB27A",
    },
  },
];

// The two fields no URL param controls; presetStyles overlays a preset's params
// on top, exactly as readStylesFromUrl overlays query params onto a base.
const BASE = { skin: "Skin", head: "Head" };

// Resolve a preset's URL params into a full, validated styles record.
export function presetStyles(config, params) {
  return overlayParams(config, BASE, params);
}

// Resolve every preset into a { name, styles } pair — the shape the UI renders.
export function resolvePresets(config) {
  return PRESETS.map((p) => ({
    name: p.name,
    styles: presetStyles(config, p.params),
  }));
}
