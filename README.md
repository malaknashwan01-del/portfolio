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

## AI assistant (free)
The chat button opens an assistant that answers questions about Malak.
- Frontend: `src/components/ChatWidget.jsx`
- Server: `netlify/functions/chat.mjs` (served at `/api/chat`), using **Groq's free API** — no credit card.
- Set **`GROQ_API_KEY`** in Netlify → Site configuration → Environment variables. The key never reaches the browser. Optional: `GROQ_MODEL` to change the model.
- Without a key, or when the free daily limit is reached, the widget answers from `src/localAnswers.js` instead, so it always works.
- Everything the assistant knows comes from `src/data.js`.
- To try the AI locally run `npx netlify dev` (plain `npm run dev` uses the backup answers).
