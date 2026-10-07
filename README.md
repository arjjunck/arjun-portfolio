# Arjun Krishna — Portfolio

Personal portfolio built with Next.js (App Router), Tailwind CSS 4 and Motion.

- `/` — Full stack version
- `/data-science` — Data science version

## Editing content

All copy lives in `portfolio-brief.json`. `content/portfolio.ts` types it and adds per-variant details.
Resume PDFs go in `public/resumes/` (`arjun-krishna-fullstack.pdf`, `arjun-krishna-data-science.pdf`); the download buttons appear once the files exist.

## Develop

```bash
npm install
npm run dev
```

Set `NEXT_PUBLIC_SITE_URL` to the deployed URL so Open Graph previews resolve correctly.
