---
description: 'Use when building GOV.UK pages, forms, journeys, or components to ensure compliance with the GOV.UK Design System — component selection, page patterns, content style, and accessibility (WCAG 2.2 AA). Applies to any prototype page work regardless of file type.'
---

# GOV.UK Design System Compliance

Authoritative references (always prefer the live docs — they reflect the current standard):

- Design System: https://design-system.service.gov.uk/
- Components: https://design-system.service.gov.uk/components/
- Patterns: https://design-system.service.gov.uk/patterns/
- Styles: https://design-system.service.gov.uk/styles/
- Frontend (Nunjucks macros, this repo uses `5.11.1`): https://frontend.design-system.service.gov.uk/
- Content style guide: https://www.gov.uk/guidance/style-guide
- Accessibility: WCAG 2.2 AA (the Design System is built to meet it)

## Core rules

1. **Use existing components and patterns.** If the Design System has it, use it — don't invent
   bespoke markup or CSS for buttons, inputs, radios, tables, tags, task lists, error summaries, etc.
2. **One question per page** is the default for form journeys unless the design clearly groups fields.
3. **Follow the established patterns** for common journeys: "Check your answers", "Question pages",
   "Confirmation pages", "Task list", "Start pages", validation/error handling.
4. **Research before building.** When unsure of a component's API or the right pattern, look it up in
   the live docs rather than guessing — component params change between versions.

## Content style

- Sentence case for headings, labels, and buttons (not Title Case).
- Plain English; short sentences; no jargon.
- No full stops at the end of headings, labels, hints, or button text.
- Button text describes the action ("Continue", "Save and continue", "Accept and send").

## Forms & validation

- Every input has a `<label>` (or legend for grouped inputs) and, where useful, hint text.
- On error: show a `govukErrorSummary` at the top linking to each field, set the field error message,
  and prefix the page `<title>` with "Error:".
- Group related inputs with `fieldset` + `legend` (e.g. radios, checkboxes, date input).

## Accessibility (WCAG 2.2 AA)

- Logical heading order; exactly one `<h1>` per page.
- Labels programmatically associated with inputs; error messages linked via `aria-describedby`.
- Sufficient colour contrast; never rely on colour alone to convey meaning.
- Fully keyboard operable with a visible focus state.
- Use the back link and skip link patterns provided by the kit/layout.

## Responsive / mobile

- Design is mobile-first; verify layouts at mobile and desktop widths.
- Use the GOV.UK grid and spacing rather than fixed pixel layouts.

## Fidelity to the source design

When replicating a Figma design, match content, layout, and component choice — but always express it
through the correct GOV.UK component. If the Figma diverges from the Design System, prefer the Design
System and flag the divergence to the user.
