# paulyoon.com

rehauled portfolio site

## stack

- next.js 16: (app router) + react 19 + typescript
- tailwind css v4
- shadcn/ui: (new york style, radix ui primitives)

## pages

| route | description |
|-------|-------------|
| `/` | home w/ hero, projects, skills |
| `/about` | bio + photo |
| `/resume.pdf` | resume (static file) |

## project structure

```
app/
  layout.tsx          # root layout, fonts, json-ld schema
  page.tsx            # home page
  about/page.tsx      # about page
  globals.css         # tailwind + css variables (oklch, blue hue 232)

components/
  hero.tsx            # hero section with animated social buttonrow
  hero-background.tsx # fixed css gradient + noise + drifting bloom
  projects.tsx        # 2-col image card grid with scroll-triggered animations
  skills.tsx          # 3-col tech skill cards with scroll-triggered animations
  nav.tsx             # floating glass pill nav (scroll-linked opacity)
  buttonrow.tsx       # ping-pong animated social links
  footer.tsx          # simple footer
  conditional-layout.tsx  # nav wrapper (hidden on /stella/*)
  scroll-reset.tsx    # prevents browser scroll restoration
  ui/
    glasspill-auto.tsx    # safari-aware glass pill (use this)
    glasspill.tsx         # chrome/firefox displacement refraction
    glasspill-safari.tsx  # css backdrop-filter fallback
    textlink.tsx          # inline link with animated underline
    ...                   # shadcn/ui primitives

lib/
  utils.ts            # cn() helper (clsx + tailwind-merge)
```

## dev

```bash
npm install
npm run dev    # localhost:3000
npm run build  # production build
```
