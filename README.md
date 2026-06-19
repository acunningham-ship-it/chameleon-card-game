# Chameleon Card Game — Website Revamp (concept)

A modern, mobile-first redesign concept for **[chameleoncardgame.com](https://chameleoncardgame.com/)** — the family color-matching card game.

> ⚠️ **This is a concept redesign, not the live store.** It's a static front-end built to show a fresh direction. The real site runs on Shopify; the plan is to keep Shopify (checkout, payments, inventory all work) and turn this design into a custom Shopify theme. See [Going live](#going-live).

## View it
- **Locally:** open `index.html` in a browser (no build step, no dependencies).
- **GitHub Pages:** enable Pages on this repo (Settings → Pages → Deploy from `main` / root) and it's live at a `github.io` URL.

## What's here
- `index.html` — the full single-page site (hero, how-to-play, what's-inside, pricing, reviews, CTA, footer)
- `styles.css` — all styling (the vibrant color-shift "Chameleon" theme, fully responsive)
- `script.js` — mobile nav, scroll reveals, buy/link wiring

Pure HTML/CSS/JS. No frameworks, no build, loads instantly. Fonts via Google Fonts; the card visuals are drawn in CSS (no image assets needed yet).

## Design direction
The game is about matching and changing colors, so the brand leans into a **color-shifting** identity — an animated 6-color gradient runs through the logo, headlines, and accents. Clean Poppins/Inter type, lots of white space, playful card visuals, and a clear path to "buy."

## What's real vs. placeholder
| Real | Placeholder (swap before launch) |
|------|----------------------------------|
| Product, the 3 packs + prices ($20 / $36 / $80), 108-card / Color + Play card info | Reviews (clearly marked "Placeholder review") |
| Payment methods listed | Real product photography (currently CSS card art) |
| Copy reflects the actual game | Real Shopify cart/checkout URLs, Instagram handle, contact link (see `script.js` → `STORE`) |

## Going live
1. **Keep Shopify.** It already handles checkout, payments, inventory, orders. Don't rebuild that.
2. Convert this design into a **custom Shopify theme** (Liquid templates + this CSS), or use it as a Shopify "custom page" / landing page.
3. Wire the buy buttons to real Shopify cart-permalink URLs (`/cart/VARIANT_ID:1`) — see the `STORE` object in `script.js`.
4. Drop in real product photos + real reviews + the real Instagram/contact links.

## Status
Built as a starting point for a conversation with the owner. Direction, structure, and styling are all here to react to — easy to restyle colors, swap sections, or extend.
