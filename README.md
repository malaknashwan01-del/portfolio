# Malak Nashwan — Portfolio

Personal portfolio of **Malak Nashwan**, frontend & mobile developer.

**Live:** _add your Netlify link here_

## Features
- Hero with a canvas brush-reveal effect (hover on desktop, auto-wander on touch)
- Scroll-triggered project cards with staggered motion
- Contact section with copy-to-clipboard and a Netlify Forms contact form
- Fully responsive, respects `prefers-reduced-motion`

## Tech
React 18 · Vite · plain CSS · Canvas 2D · IntersectionObserver · Netlify Forms

## Run locally
```bash
npm install
npm run dev
```

## Edit content
All text, projects, skills and links live in `src/data.js`.
Project screenshots go in `public/work/`, the hero photos in `public/images/`.

## Deploy
Connected to Netlify — every push to `main` redeploys (`netlify.toml` sets the build).

## AI assistant
The chat button opens an assistant that answers questions about Malak.
- Frontend: `src/components/ChatWidget.jsx`
- Server: `netlify/functions/chat.mjs` (served at `/api/chat`), which calls the Claude API.
- It needs the environment variable **`ANTHROPIC_API_KEY`** set in Netlify → Site configuration → Environment variables. The key never reaches the browser.
- Everything the assistant knows comes from `src/data.js`.
- To try it locally run `npx netlify dev` (plain `npm run dev` serves the site without the function).
