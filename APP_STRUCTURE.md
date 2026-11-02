# Broonic app structure

## Experiences

| Route | Purpose |
| --- | --- |
| `/` | Brand story, menu introduction, club concept, and app entry. |
| `/app/` | Mobile dashboard with a featured drink, check-in, recommendations, and reward progress. |
| `/menu/` | Printed-menu layout on desktop and mobile, with category, type, and size filters and interactive item previews. |
| `/bebidas/` | Suggested repeat orders and a featured drink. |
| `/carrito/` | Local cart summary and demo order confirmation. |
| `/perfil/` | Illustrative member profile and reward progress. |

Shared Astro components render the app header, bottom navigation, product cards, and check-in dialog. `src/data/MenuItem.ts` holds the local menu. The `broonic-cart` local-storage key carries selected items between screens. Checkout clears that local cart; it does not create a real order or take payment.

The landing menu cards use procedural Three.js cup models animated with GSAP. The menu opens a 3D side preview on desktop and a dialog on mobile; drinks use paper or iced cups, while food and syrup have simple dedicated models. CSS cup art remains as a fallback on the landing cards when WebGL is unavailable. The desktop menu hero is served as an Astro-optimized WebP asset.

The check-in code and reward count are visual demo data. A production version would need account identity, a store-issued code, server validation, and a live reward balance. Profile settings are also illustrative.

## PWA behavior

`public/manifest.webmanifest` starts at `/app/` in standalone mode. `public/sw.js` caches the landing page, app screens, and key artwork for repeat visits, then uses the cache as an offline fallback. Install prompts require HTTPS or `localhost`; a phone opening a local IP over plain HTTP may only offer a bookmark. On iPhone and iPad, installation is through Safari’s Share menu. Advance the service worker cache version when shell assets change.

## Accessibility and motion

Links and buttons have readable labels, menu filters expose `aria-pressed`, and the check-in dialog supports Escape. The landing page uses GSAP with ScrollTrigger for entry reveals and a stamp parallax, and skips that motion when the visitor requests reduced motion.
