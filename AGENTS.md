# AGENTS.md

> **AI Context & Rules**
> **Project:** Collector Capital Web - React 19 + TypeScript 5.8
> **Tooling:** `vercel-react-best-practices`, `tailwind-css-patterns`. Use these skills when writing or reviewing new code.

---

## 1. Architectural Constraints (Non-Negotiable)

- **Architecture:** Feature-Sliced Design — shared UI in `components/`, domain logic in `features/`
- **Language Rule:** TypeScript 5.8.x — all new files must be `.ts` or `.tsx`
- **Dependency Flow:** `lib/` → `features/` → `components/` → `App`. No cross-feature imports. No circular references.

## 2. Technology Stack & Patterns

| Context              | Technology                | Rule / Version                                                                     |
| :------------------- | :------------------------ | :--------------------------------------------------------------------------------- |
| Runtime              | React                     | v19.x                                                                              |
| Language             | TypeScript                | ~5.8.2                                                                             |
| Build Tool           | Vite                      | v6.x                                                                               |
| Styling              | Tailwind CSS              | v4.x via `@tailwindcss/vite` — use `@theme` block in `index.css` for design tokens |
| Backend / Auth       | Supabase                  | v2.x — client initialized in `src/lib/supabase.ts`                                 |
| Internationalization | i18next + react-i18next   | v25 / v16 — all user-facing strings must go through `useTranslation()`             |
| Forms                | react-hook-form           | v7.x — use for all form handling                                                   |
| Icons                | lucide-react              | v0.5x                                                                              |
| Animations           | motion                    | v12.x                                                                              |
| Class Utilities      | clsx + tailwind-merge     | Use together for conditional class merging                                         |
| Server               | Express                   | v4.x — entry in `server.ts`, API routes in `api/`                                  |
| Email                | Resend                    | v6.x — used in API routes                                                          |
| CAPTCHA              | @marsidev/react-turnstile | v1.x — required on public-facing forms                                             |

---

## 3. Workflow & File Map

### New Feature Request Workflow

1. Create a new folder under `src/features/<feature-name>/`
2. Add a `<FeatureName>View.tsx` as the entry component
3. Register the view in `App.tsx` with a corresponding `currentView` case
4. Add navigation strings to both `en` and `es` translation objects in `src/i18n.ts`
5. If the feature requires data, use Supabase client from `src/lib/supabase.ts`
6. If the feature needs shared UI primitives, add them to `src/components/ui/`

### Project Structure Map

```
src/
  App.tsx              # Root component — manual URL-param router (no React Router)
  i18n.ts              # i18next config with inline EN/ES translations
  index.css            # Tailwind v4 @theme tokens and global styles
  main.tsx             # React entry point
  components/
    layout/            # Navbar, Footer — shared across all views
    ui/                # Reusable primitive UI components (button, card, input, etc.)
  features/            # One folder per domain (auth, dashboard, strategy, contact…)
  lib/
    supabase.ts        # Supabase client singleton
    utils.ts           # Shared utilities (cn helper, etc.)
api/                   # Express API handlers (serverless-compatible)
supabase/
  functions/           # Supabase Edge Functions
  migrations/          # SQL migration files (sequential timestamps)
```

---

## 4. Configuration & Dependency Management

- Install new packages with `npm install <package>` and update `package.json`
- Environment variables must be prefixed with `VITE_` to be accessible in the browser (e.g. `VITE_SUPABASE_URL`)
- Server-side secrets (Resend, Google GenAI) are loaded via `dotenv` in `server.ts` — never expose them to the client bundle
- Path alias `@/` maps to `./src/` — always use it for cross-directory imports
- Tailwind design tokens are defined exclusively in the `@theme` block inside `src/index.css`; do not add inline Tailwind config files

## 5. Key Conventions

- **Routing:** No React Router — navigation is handled via `window.location.search` (`?view=X&id=Y`) and `window.history.pushState`. All views receive an `onNavigate(view, id?)` prop.
- **Translations:** Both `en` and `es` keys must be added simultaneously in `src/i18n.ts` for every new string.
- **Supabase guard:** Always check `isSupabaseConfigured` before making Supabase calls to avoid runtime errors in preview environments.
- **Forms:** Use `react-hook-form` — avoid uncontrolled `useState` chains for form fields.
- **Component naming:** PascalCase for components, camelCase for utilities and hooks.
