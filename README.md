# Ibrahim Khalil — Portfolio

A data-driven personal portfolio built with **Next.js (App Router) + TypeScript + Tailwind CSS v4 + GSAP/ScrollTrigger**, styled as a professional comic-book / graphic-novel layout.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # type-check
```

## Editing content: `data/portfolio.json`

**All portfolio content lives in [`data/portfolio.json`](data/portfolio.json).** Components contain only layout and behavior, so you can update the site without touching any `.tsx` file.

| You want to…                     | Edit in `portfolio.json`                                 |
| -------------------------------- | -------------------------------------------------------- |
| Change name / headline / intro   | `personal`, `hero`                                       |
| Add or remove a project          | add/remove an object in `projects`                       |
| Add a GitHub / demo link         | `projects[i].links.github` / `links.demo`                |
| Add a project screenshot         | `projects[i].image` → `{ src, alt, width, height }`      |
| Add or remove a skill            | `skills.categories[i].items`                             |
| Add a research paper             | add an object to `research` (`featured: true` = big panel) |
| Add experience / internships     | add objects to `experience` (title, organization, date, …) |
| Add a certification              | add objects to `certifications`                          |
| Change social links / email      | `social`, `personal.email`                               |
| Change profile photo / CV        | `personal.avatar`, `personal.cv`, `hero.secondaryCta`; put files in `public/` |
| Change section titles / labels   | `sections.*`                                             |
| Change navigation                | `navigation`                                             |
| Footer text                      | `footer` (`{year}` and `{name}` are filled in automatically) |

Empty collections are handled gracefully. With no data, `experience` shows its `emptyState` message, and the Achievements section is hidden when it has neither certifications nor achievements.

Icons are referenced by name (for example `"shield"` or `"github"`). See the map in [`components/Icon.tsx`](components/Icon.tsx) for available names.

For correct social-preview URLs, set `site.url` (or the `NEXT_PUBLIC_SITE_URL` environment variable) to the deployed URL.

## Structure

```
app/            layout (metadata, fonts), page, global styles
components/     Navbar, Hero, About, Skills, Projects, Research, Experience,
                Education, Certifications, Contact, Footer, Cursor, Animations, …
data/           portfolio.json — the single source of truth
lib/            types for the JSON schema + data loader
public/         profile image and CV
```

## Motion and accessibility

- All GSAP / ScrollTrigger logic lives in `components/Animations.tsx`. Components mark elements with `data-*` attributes (`data-hero`, `data-reveal`, `data-stagger`, `data-timeline`, `data-parallax`).
- Anchor links scroll smoothly with GSAP ScrollToPlugin, offset by the sticky navbar.
- `prefers-reduced-motion` disables the animations and the custom cursor.
- The custom cursor only appears on devices with a fine pointer that can hover (desktop mice).
- The contact form has no backend. It validates input and opens the visitor's email client with the message pre-filled.
