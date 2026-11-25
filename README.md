# Atelier Lumière Events

An editorial React + TypeScript + Vite template for a luxury event studio. Scrollcraft's installed runtime powers pinned process storytelling, a lateral-pan portfolio moment, semantic flow reveals, and hero parallax. The signature move lets a visitor choose an event and carry its theme into the inquiry form.

## Run locally

```bash
npm install
npm run dev
```

Production build: `npm run build`; local production preview: `npm run preview`.

## Rebrand

Edit `src/data/siteConfig.ts` for brand details, page copy, navigation, services, process, portfolio, testimonials, and contact details. Replace the Unsplash photo IDs with licensed brand photography. Colors, type, motion, spacing, and responsive adjustments live in `src/styles.css`. Inquiry submissions are validated in-browser and show a confirmation state; connect `handleSubmit` in `src/App.tsx` to your CRM or form endpoint before collecting real inquiries. The newsletter form is a front-end confirmation only and should be connected to your email platform.

## Scrollcraft plan

See `BRIEF.md` for the self-authored creative brief, journey, feeling curve, layer contract, and device score. The unmodified Scrollcraft engine source is kept in `src/scrollcraft/`.
