---
description: 'Use when creating or editing Nunjucks views (.html/.njk) for the GOV.UK Prototype Kit — page structure, layout inheritance, blocks, GOV.UK Frontend macro imports, and grid usage.'
applyTo: 'app/views/**/*.html,app/views/**/*.njk'
---

# Nunjucks Templates (GOV.UK Prototype Kit)

Views are Nunjucks templates rendered by the GOV.UK Prototype Kit (`govuk-frontend@5.11.1`).

## Page skeleton

Every page extends the base layout and puts markup in the `content` block:

```njk
{% extends "layouts/main.html" %}

{% set pageName = "Page title" %}

{% block content %}
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Page heading</h1>
    </div>
  </div>
{% endblock %}
```

- `layouts/main.html` extends the kit's `govuk-prototype-kit/layouts/govuk-branded.njk`.
- Use one `<h1>` per page. Follow heading order (`govuk-heading-xl/l/m/s`).

## Importing macros

Import each GOV.UK Frontend macro you use at the top of the `content` block (or page):

```njk
{% from "govuk/components/button/macro.njk" import govukButton %}
{% from "govuk/components/input/macro.njk" import govukInput %}

{{ govukInput({
  label: { text: "Full name" },
  id: "full-name",
  name: "fullName"
}) }}

{{ govukButton({ text: "Continue" }) }}
```

- Prefer macros over hand-written HTML for any standard component.
- Verify macro params against https://design-system.service.gov.uk/components/ for version `5.11.1`.

## Layout & grid

- Wrap content in `govuk-grid-row` → `govuk-grid-column-*`.
- Use `govuk-grid-column-two-thirds` for typical text/form content.
- Use GOV.UK spacing/typography classes rather than custom CSS.

## Data & state

- Read session data with `data['key']` (populated from forms and `session-data-defaults.js`).
- Use `{% if %}` / `{% for %}` for conditional and repeated content.
- Custom filters (from `app/filters.js`) are applied with the pipe: `{{ value | myFilter }}`.

## Conventions

- 2-space indent, LF, final newline, UTF-8.
- Sentence case content; no trailing full stops on headings, labels, or button text.
- Reusable snippets: `{% include "..." %}`; shared page shells: `{% extends "..." %}`.
- Don't hard-code the service name — it comes from `app/config.json` as `serviceName`.
