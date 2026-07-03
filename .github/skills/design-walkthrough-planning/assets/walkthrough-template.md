# Build Walkthrough — {design name}

> **You can edit this document directly.** Change acceptance criteria, reorder pages, or add notes.
> The agent re-reads this file before building or iterating on each page and honours your edits.

- **Design spec (cached)**: repo memory `figma-design-{slug}.md`
- **Reference images**: `design/figma/{slug}/`
- **Status legend**: `not started` · `in progress` · `built (awaiting sign-off)` · `accepted`

## Progress overview

| #   | Page / frame | View file             | Route   | Status      |
| --- | ------------ | --------------------- | ------- | ----------- |
| 1   | {frame}      | app/views/{page}.html | /{path} | not started |
| 2   | {frame}      | app/views/{page}.html | /{path} | not started |

---

## Page 1 — {frame name}

- **Status**: not started
- **View**: `app/views/{page}.html`
- **Route(s)**: `GET /{path}` {and `POST /{path}` if a form}
- **Reference image**: `design/figma/{slug}/{frame}.png`
- **GOV.UK components**: {govukButton, govukInput, ...}
- **Depends on**: {none / page N}

### Acceptance criteria (editable)

- [ ] Layout matches the reference frame at mobile and desktop widths.
- [ ] All copy matches the design verbatim (headings, labels, hints, button text).
- [ ] Standard elements use GOV.UK Frontend macros (no bespoke markup).
- [ ] Interactions/navigation work (links, form submit, back link, redirects).
- [ ] Accessible: correct heading order, associated labels, error handling, visible focus.
- [ ] {add design-specific criteria here}

### Build notes

- {filled in during implementation}

### Sign-off

- Accepted by user: {no / yes — date}

---

_(repeat the Page block for every frame)_
