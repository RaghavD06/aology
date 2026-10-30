# For you, Mom ♡

A personal, responsive React + TypeScript keepsake, built with Vite.

## Run

```sh
npm install
npm run dev
```

`npm run build` produces `dist/`. `npm run preview` previews that build. `npm run lint` checks source files.

## Personalise

- Edit messages in `src/content.ts`; section headings and narrative layout are in `src/App.tsx`.
- Replace `public/images/mom-and-me.png` with your own photo, keeping the filename, or change `photo` in `src/content.ts`. Both photo sections share this image.
- The supplied childhood photo is included. Publishing this repository or website will also publish that photo.
- Typography uses Google Fonts with local serif, cursive, and sans-serif fallbacks.

## Interactions and accessibility

The opening envelope toggles a letter. All 12 notes and six reminder envelopes open a native modal with keyboard focus containment, Escape dismissal, and focus restoration. The final button offers a hug animation. Navigation uses real anchor links. Reduced-motion preferences disable animations and reveal delays.

## Hosting

Deploy `dist/` to a static host. For GitHub Pages under `/aology/`, build with `npm run build -- --base=/aology/` and upload `dist/` via your hosting workflow. No backend or secrets are required.

## Browser checks

Run npm test (install Chromium first with npx playwright install chromium). Checks cover every note and reminder, modal keyboard dismissal and focus restoration, the opening letter, hug, photo loading, overflow at 1440/390/320px, and reduced motion.


## Live deployment

The site deploys to https://raghavd06.github.io/aology/ through GitHub Pages. Every push to main runs lint and a production build, then publishes dist using .github/workflows/deploy.yml.

