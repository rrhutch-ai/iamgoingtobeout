# #iAmGoing to Be Out

A Progressive Web App (PWA) April Fool's Day joke for SEBTS staff. Presents itself as an AI out-of-office chatbot for Ryan R. Hutchinson, Executive Vice President. Every query returns the same punchline.

## Live URL

https://rrhutch-ai.github.io/iamgoingtobeout/

## Stack

Vanilla HTML5, CSS3, JavaScript (ES6+). No frameworks, no build step, no dependencies. PWA with manifest and service worker.

## Deployment

1. Push all files to the `main` branch.
2. In GitHub: Settings > Pages > Source > `main` branch, root `/`. Save.
3. Wait 1–2 minutes for GitHub Pages to build.
4. Verify: https://rrhutch-ai.github.io/iamgoingtobeout/

## Assets

- `assets/images/avatar.jpg` — staff photo (circular crop)
- `assets/images/sebts-logo.png` — SEBTS logo (white via CSS filter on dark header)
- `assets/images/og-preview.png` — 1200×630 social preview image
- `assets/icons/icon-192.png`, `icon-512.png`, `icon-maskable.png` — PWA icons

## Configuration

All settings are hardcoded in `js/app.js` under the `CONFIG` object.
