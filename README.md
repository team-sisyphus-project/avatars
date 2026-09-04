# Autosquad Avatars

Build a face for every squad member. Mix, match, and download.

Pick a style for each feature — skin, hair, facial hair, body, eyes, mouth,
nose, accessories and background — set its colour, and download the result as
a PNG. Every avatar is also a link: the full configuration lives in the URL,
so any avatar can be shared or bookmarked exactly as it looks.

## Features

- **Nine features to style**, each with its own set of shapes
- **Colour palettes** per feature, plus a custom colour picker
- **Randomize** for a complete avatar in one click
- **Download as PNG**, or copy a share link
- Runs entirely in the browser. No accounts, no server, no data leaves the page

## Tech stack

| Role | Choice | Notes |
| --- | --- | --- |
| Build | Vite | Static output only |
| UI | React 18 + ReScript | ReScript compiles to JS before the Vite build |
| Artwork | Inline SVG | Every feature is drawn from code, no image assets |
| Sharing | URL query params + a bit-packed short code | Stateless, nothing stored |

There is no backend and no database. The build output is a static bundle of
roughly 800 KB.

## Run it locally

```bash
npm install
npm run build
npx http-server dist -p 8080
```

## What changed from upstream

This is a rebrand and cleanup of [draftbit/avatar-generator](https://github.com/draftbit/avatar-generator).
The avatar artwork and the core generator are unchanged.

**Branding**
- Draftbit logo, wordmark, copy, links and Product Hunt button replaced with Autosquad
- Colour values were scattered across eight stylesheets; they now live in one
  `src/components/tokens.css` and carry the Autosquad palette
- Bundled Cerebri Sans font files removed (a commercial typeface); the app now
  uses the platform UI font stack

**Fixes**
- `getEyesOpen` passed the SVG *size* where the *fill* belongs, producing
  `fill="64"`. Eyes fell back to black regardless of any colour set
- Eyes, mouth and nose previews rendered the whole 64×64 face, so each feature
  showed at true scale — the mouth occupied 3.4 units of 64 and read as a dot.
  Previews now fit the drawn bounds. Faint overlays are excluded when measuring,
  because the nose ships a shadow nearly twice its own width

**Added**
- Eyes and mouth are now colourable. 18 SVGs ignored the fill they were given;
  they now honour it, and each has a 12-colour palette. The short share code
  gained two colour fields and moved to version 2
- Nose follows the skin colour by design, and the UI now says so

**Removed**
- The developer API section, its Cloudflare Worker and `wrangler` config. The
  image API, MCP server and short-link resolver all needed that Worker, so on a
  static host the section advertised endpoints that returned 404

## Attribution

Derived from [draftbit/avatar-generator](https://github.com/draftbit/avatar-generator)
by Draftbit, used under the MIT License. The original licence is preserved in
[LICENSE](./LICENSE); details are in [NOTICE.md](./NOTICE.md).

- Upstream repository: https://github.com/draftbit/avatar-generator
- Forked at commit: `0d89417bb942b34fa87775897cc8cf8437d17b79`
