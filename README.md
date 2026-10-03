# Vatsal Hitesh Lodaya — 3D portfolio

React 19 + TypeScript + Vite + Tailwind CSS v4 + React Three Fiber + Framer Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then builds to dist/
npm run preview    # serve the production build locally
```

## Edit the content

Every word on the site lives in **`src/data/resume.ts`**. Each project is tagged
`source: 'resume'` or `source: 'github'` so it is always clear where a fact came from.
Nothing is hard-coded inside the components.

Replace `public/Vatsal_Lodaya_Resume.pdf` to update the download. Replace the images in
`public/images/` (keep the file names) to update the portrait.

## Before you deploy

Set your final URL so canonical and social-share tags are generated (they are omitted otherwise,
so no placeholder URLs ever ship):

```bash
VITE_SITE_URL=https://your-domain.com npm run build
```

Deploying under a sub-path (for example GitHub Pages at `/portfolio/`)? Also set `VITE_BASE=/portfolio/`.
The `dist/` folder is a static site: Netlify, Vercel, Cloudflare Pages and GitHub Pages all work.

## Structure

```
src/
  data/resume.ts            all content (typed)
  components/               Hero, About, Experience, Projects, Skills, Education, Contact, Nav, Intro
  components/three/Scene.tsx   WebGL scene (lazy-loaded): particles, glow orbs, wireframes, grid, camera rig
  components/Motifs.tsx     SVG previews for projects without a screenshot
  hooks/  lib/              media queries, scroll spy, helpers
```

## Performance and accessibility notes

- The 3D scene is code-split. The page is readable before Three.js has downloaded.
- Particle count drops on phones and low-core devices; pixel ratio is capped; tilt and magnetic effects only run on mouse devices.
- Frosted-glass blur is used on tablet and desktop only. Phones get a solid panel.
- `prefers-reduced-motion`: no intro, no tilt, no parallax, static 3D frame, instant scrolling.
- If WebGL is unavailable or fails, the site falls back to a CSS gradient background.
- Skip link, visible focus rings, semantic headings, keyboard-operable menu (Escape closes it).
