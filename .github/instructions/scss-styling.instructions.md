---
description: 'Use when writing or editing SCSS/CSS for the GOV.UK Prototype Kit — custom styles in application.scss, using govuk-frontend Sass tools, and knowing when NOT to add custom CSS.'
applyTo: 'app/assets/sass/**/*.scss'
---

# SCSS Styling (GOV.UK Prototype Kit)

Custom styles live in [app/assets/sass/application.scss](../../app/assets/sass/application.scss),
compiled by the kit. GOV.UK Frontend (`5.11.1`) is already imported by the kit.

## When to add custom SCSS

Rarely. Reach for the Design System first:

- Use GOV.UK **components**, **utility classes** (`govuk-!-margin-*`, `govuk-!-text-align-*`), and
  **typography/spacing** classes before writing any CSS.
- Only add custom SCSS when the Design System genuinely cannot express the design.

## How to write it

- Prefer GOV.UK Sass tools over raw values:
  - Colours: `govuk-colour("blue")`, `govuk-shade`, `govuk-tint`.
  - Spacing: `govuk-spacing(4)` instead of hard-coded `px`/`rem`.
  - Typography: `govuk-font($size: 19)`; responsive helpers where appropriate.
- Namespace bespoke classes clearly (e.g. `.app-...`) to avoid clashing with `govuk-` classes.
- Keep overrides minimal and localised; never restyle core `govuk-` components to look non-standard
  without a deliberate reason.

## Conventions

- 2-space indent, LF, final newline, UTF-8.
- Follow the [GOV.UK Frontend Sass/CSS conventions](https://github.com/alphagov/govuk-frontend)
  (BEM-ish naming, nesting kept shallow).
- Mobile-first: base styles for small screens, enhance up with `govuk-media-query`.
- Don't reach for a CSS framework — the Design System is the framework.
