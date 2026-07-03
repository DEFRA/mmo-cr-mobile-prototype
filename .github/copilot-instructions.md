# Copilot Instructions — mmo-cr-mobile-prototype

A **GOV.UK Prototype Kit** application wrapped for Defra's Core Delivery Platform (CDP). It is a
_prototyping tool_, not a production service — favour clarity and speed over resilience, security
hardening, or performance tuning. See [README.md](../README.md) for full setup.

## Tech Stack

- **GOV.UK Prototype Kit** `13.18.0` (Express.js based) — the runtime
- **GOV.UK Frontend** `5.11.1` — components, styles, macros
- **@govuk-prototype-kit/common-templates** `2.0.1`
- **Nunjucks** — templating for views (`.html` / `.njk`)
- **SCSS** — styling (compiled by the kit)
- **Vanilla JavaScript** — client-side and CommonJS server-side (routes/filters)
- **Node.js** `>= v22` (pinned `v22.16.0` in [.nvmrc](../.nvmrc)), **npm** `>= v11`
- **Prettier** `3.6.2` — formatting

## Project Structure

- [app/routes.js](../app/routes.js) — Express routes via `govukPrototypeKit.requests.setupRouter()`
- [app/filters.js](../app/filters.js) — Nunjucks filters via `govukPrototypeKit.views.addFilter`
- [app/config.json](../app/config.json) — service name and plugin config (`rebrand` brand toggle)
- [app/data/session-data-defaults.js](../app/data/session-data-defaults.js) — default session data
- [app/views/](../app/views/) — Nunjucks pages; `index.html` is the home page
- [app/views/layouts/main.html](../app/views/layouts/main.html) — base layout, extends the kit's `govuk-branded.njk`
- [app/assets/sass/application.scss](../app/assets/sass/application.scss) — custom styles
- [app/assets/javascripts/application.js](../app/assets/javascripts/application.js) — custom client-side JS

## Build and Run

```bash
nvm use            # switch to Node v22.16.0
npm install        # install dependencies
npm run dev        # run the kit in development (auto-reload)
npm run format     # format with Prettier before committing
```

- `npm run serve` / `npm run start` run the kit without dev auto-reload.
- There is **no test suite** — this is a prototype. Validate by running `npm run dev` and viewing pages.

## Conventions

- **Formatting**: 2-space indent, LF, final newline, UTF-8 (see [.editorconfig](../.editorconfig)).
  Prettier: no semicolons, single quotes, no trailing commas (see [.prettierrc.js](../.prettierrc.js)).
- **Server JS**: CommonJS (`require` / `module.exports`), matching [app/routes.js](../app/routes.js).
- **Views**: every page extends `layouts/main.html`; use GOV.UK Frontend macros/components, never hand-rolled markup for standard components.
- **Design fidelity**: follow the [GOV.UK Design System](https://design-system.service.gov.uk/) patterns, components, and content style. Prefer built-in components over custom CSS.
- **Secrets**: never commit `.env`; passwords/secrets are provided via the CDP Portal (see README).

## Building Prototypes from Figma

To replicate a Figma design as GOV.UK Prototype Kit pages, use the **GOV.UK Prototype Designer**
agent (`.github/agents/govuk-prototype-designer.agent.md`). It follows a research → plan →
implement → iterate workflow with a mandatory read-only Figma connection and a per-page acceptance
walkthrough.
