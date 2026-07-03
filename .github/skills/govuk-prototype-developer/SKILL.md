---
name: govuk-prototype-developer
description: "Use when building or editing GOV.UK Prototype Kit pages — creating Nunjucks views, wiring Express routes, adding filters, form journeys, session data, and GOV.UK Frontend components/macros. Triggers: 'add a page', 'create a prototype page', 'build this screen', 'wire up a route', 'add a form', 'GOV.UK component', 'prototype journey'."
argument-hint: 'The page/journey to build (or the cached Figma frame to implement)'
---

# GOV.UK Prototype Developer

Build faithful, standards-compliant GOV.UK Prototype Kit pages. This skill covers the mechanics of
turning a design/spec into working views, routes, filters, and journeys in this repo.

## When to Use

- Creating a new prototype page or a multi-page journey.
- Implementing a cached Figma frame (from `figma-design-extraction`) as a real page.
- Adding forms, radios, checkboxes, task lists, summary lists, or other GOV.UK components.
- Wiring routes, filters, or session data for branching/form-handling.

## Golden rules

1. **Prefer built-in components.** Use GOV.UK Frontend macros over hand-written HTML for anything the
   Design System provides. Never re-implement a standard component with custom markup/CSS.
2. **Research first.** Before building a component you're unsure about, look up the current API on the
   [Design System](https://design-system.service.gov.uk/components/) and
   [Frontend docs](https://frontend.design-system.service.gov.uk/). Versions matter — this repo uses
   `govuk-frontend@5.11.1`.
3. **Content style.** Follow the [GOV.UK content style guide](https://www.gov.uk/guidance/style-guide):
   sentence case, plain English, no full stops on headings/labels.
4. **Accessibility is not optional.** Correct heading order, labels tied to inputs, one `h1` per page,
   error summary linking to fields, visible focus. Follow WCAG 2.2 AA as the Design System does.

## Repo mechanics

### Pages (Nunjucks views) — `app/views/`

- Create `.html` files that `{% extends "layouts/main.html" %}`.
- Put page markup in `{% block content %}`; set `{% set pageName = "..." %}`.
- Use the GOV.UK grid: `govuk-grid-row` + `govuk-grid-column-two-thirds` for text/forms.
- Import macros at the top of the block, e.g.
  `{% from "govuk/components/button/macro.njk" import govukButton %}`.
- See [nunjucks-templates instructions](../../instructions/nunjucks-templates.instructions.md).

### Routes — `app/routes.js`

- Add routes to the router from `govukPrototypeKit.requests.setupRouter()`.
- CommonJS only (`require` / `module.exports`); no semicolons, single quotes (Prettier).
- Handle form posts, branch on `req.session.data`, and `res.redirect` to the next page.
- See [javascript-prototype instructions](../../instructions/javascript-prototype.instructions.md).

### Data & filters

- Default session values → `app/data/session-data-defaults.js`.
- Custom Nunjucks filters → `app/filters.js` via `govukPrototypeKit.views.addFilter`.

### Styling — `app/assets/sass/application.scss`

- Only add custom SCSS when the Design System genuinely can't express it.
- See [scss-styling instructions](../../instructions/scss-styling.instructions.md).

## Procedure

1. **Identify the page's components** from the design/spec and map each to a GOV.UK macro.
2. **Confirm the macro API** (params, options) against the docs for `5.11.1` if uncertain.
3. **Create the view** extending `layouts/main.html`, importing only the macros used.
4. **Wire the route(s)** for GET (render) and, for forms, POST (store to session, redirect).
5. **Add data/filters** if the page needs defaults or formatting.
6. **Run and verify**: `npm run dev`, open the page, compare against the reference image, check
   responsive behaviour and keyboard/screen-reader basics.
7. **Format**: `npm run format` before finishing.

## Common component quick reference

| Need                 | Macro / include                                                              |
| -------------------- | ---------------------------------------------------------------------------- |
| Button               | `govuk/components/button/macro.njk` → `govukButton`                          |
| Text input           | `govuk/components/input/macro.njk` → `govukInput`                            |
| Radios               | `govuk/components/radios/macro.njk` → `govukRadios`                          |
| Checkboxes           | `govuk/components/checkboxes/macro.njk` → `govukCheckboxes`                  |
| Select               | `govuk/components/select/macro.njk` → `govukSelect`                          |
| Date input           | `govuk/components/date-input/macro.njk` → `govukDateInput`                   |
| Back link            | `govuk/components/back-link/macro.njk` → `govukBackLink`                     |
| Error summary        | `govuk/components/error-summary/macro.njk` → `govukErrorSummary`             |
| Summary list         | `govuk/components/summary-list/macro.njk` → `govukSummaryList`               |
| Tag                  | `govuk/components/tag/macro.njk` → `govukTag`                                |
| Panel (confirmation) | `govuk/components/panel/macro.njk` → `govukPanel`                            |
| Task list            | `govuk/components/task-list/macro.njk` → `govukTaskList`                     |
| Notification banner  | `govuk/components/notification-banner/macro.njk` → `govukNotificationBanner` |

Always verify exact params against the docs — the table is a starting point, not the API.

## Validation checklist

- [ ] Page extends `layouts/main.html` and renders without Nunjucks errors.
- [ ] Only GOV.UK macros used for standard components (no bespoke re-implementations).
- [ ] Matches the reference image at mobile and desktop widths.
- [ ] One `h1`; headings in order; labels/hints/errors correctly associated.
- [ ] Routes handle GET (and POST for forms) and redirect correctly.
- [ ] `npm run format` run; no console/Nunjucks errors in `npm run dev`.
