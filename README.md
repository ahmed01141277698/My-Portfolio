# Ahmed Badawy — Portfolio

React + Vite + Tailwind v4. Arabic (RTL) and English (LTR) with a language switch in the navbar.
Texts live in `src/i18n/translations.ts`; the original projects live in `src/data/projects.ts`.

## Adding new projects (local dashboard)

```bash
npm install
npm run dashboard      # opens http://localhost:3000/My-Portfolio/__admin/
```

From the dashboard you can add, edit and delete **new** projects, with a name and description in Arabic and English,
a category, technologies, demo/code links, and any mix of:

- uploaded images and videos (saved to `public/uploads/`, up to 95 MB each)
- direct image or video links
- YouTube / Vimeo links (played inside the site)
- any other link (shown as an "Open link" button)

Projects are saved to `src/data/newProjects.json` and appear first on the site.
The dashboard only exists while the dev server runs and only answers on `localhost`; it is not part of `npm run build`.

To publish: `git add . && git commit -m "new project" && git push`, then deploy as usual.
For large videos prefer a YouTube/Vimeo link: GitHub rejects files over 100 MB.
