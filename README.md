# Morning Sports Rundown

A minimal [Hugo](https://gohugo.io/) static site that publishes one daily morning sports rundown. Built for automation: add a markdown file, push to `main`, and GitHub Actions deploys to GitHub Pages.

**Live site:** https://asimpson.github.io/sports-rundown/

## Local development

Requires Hugo **extended** (pinned in CI to `0.139.4`).

```bash
hugo server -D
```

Build for production:

```bash
hugo --minify --gc
```

Output is written to `public/`.

## Publishing a new rundown

1. Create a file at `content/rundowns/YYYY-MM-DD.md` (use the rundown’s calendar date).
2. Commit and push to `main`.
3. The [GitHub Actions workflow](.github/workflows/pages.yml) builds and deploys the site.

### File format

Each rundown is a single Markdown file with YAML front matter:

```markdown
---
title: "Morning Sports Rundown: Mon, Oct 26, 2026"
date: 2026-10-26T07:00:00-04:00
---

**NBA**

- **Lakers 110, Celtics 108.** Short recap sentence here.
- **Heat 95, Knicks 92.** Another game. {{< x url="https://x.com/NBA/status/1234567890" label="Highlight clip title" >}}

**NFL**

- Injury notes and schedule bullets as needed.
```

**Conventions**

- `title` — headline shown on the page and in the archive list.
- `date` — publication date; drives the permalink (`/YYYY/MM/DD/`) and sort order.
- Body — use `**Sport or league:**` lines as section headings, then `-` bullets for games and notes.
- Put clip embeds on the same bullet as the score or play they belong to (not in a separate “highlights” section).

### Shortcodes

#### X (Twitter) clip — `x`

Renders the official embed (`blockquote` + `widgets.js`). The script loads **only** on pages that include this shortcode. Without JavaScript, readers see a plain link.

```markdown
{{< x url="https://x.com/NBA/status/1234567890" label="Optional link text" >}}
```

- `url` (required) — full status URL (`x.com` or `twitter.com`).
- `label` (optional) — fallback link text before the embed loads (default: `View post on X`).

#### YouTube — `youtube`

Default is a **click-to-load** facade (thumbnail + minimal JS) using `youtube-nocookie.com` after play. For a direct lazy iframe instead:

```markdown
{{< youtube id="dQw4w9WgXcQ" title="Optional accessible title" >}}
{{< youtube url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" >}}
{{< youtube id="dQw4w9WgXcQ" lite="false" >}}
```

- `id` or `url` (one required) — video ID or watch URL.
- `title` (optional) — iframe `title` attribute.
- `lite` (optional) — `"true"` (default) click-to-load; `"false"` for immediate lazy iframe.

## Theme

Custom theme lives in [`themes/rundown`](themes/rundown): single column, system fonts, one small stylesheet, `prefers-color-scheme` dark mode, no images required.

## GitHub Pages setup

In the repository on GitHub:

1. **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions** (not “Deploy from a branch”).
2. Ensure Actions are allowed for the repo.

Pushes to `main` run `.github/workflows/pages.yml`, which builds with Hugo extended `0.139.4` and deploys via `deploy-pages`.

## License

MIT (theme and site scaffolding). Rundown content is yours.
