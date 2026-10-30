# Broonic Coffee Club

An Astro prototype with two connected experiences: an editorial landing page and a mobile coffee club app. The supplied Broonic logo artwork is used throughout.

## Routes

- `/` — landing page
- `/app/` — mobile app home
- `/menu/`, `/bebidas/`, `/carrito/`, `/perfil/` — app screens

## Development

```sh
npm install
astro dev --background
```

Manage the server with `astro dev status`, `astro dev logs`, and `astro dev stop`. Run `npm run build` for a production build.

The app uses browser local storage for a demo cart. Its QR check-in, rewards, profile, location, and order confirmation are illustrative; no payment or store system is connected. See [APP_STRUCTURE.md](APP_STRUCTURE.md) and [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).

The mobile experience includes a PWA manifest and service worker. Install it through a browser's app-install option on HTTPS or `localhost`; a local network `http://` address does not meet browser PWA security requirements.
