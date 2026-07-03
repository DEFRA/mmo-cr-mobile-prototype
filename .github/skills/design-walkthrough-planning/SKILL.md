---
name: design-walkthrough-planning
description: "Use when a Figma design has multiple frames/screens and you need a sequential, per-page build plan with user-editable acceptance criteria and explicit sign-off gates. Produces and maintains a walkthrough document that tracks each page from not-started → built → accepted. Triggers: 'plan the build', 'walkthrough', 'multiple frames', 'step by step', 'acceptance criteria', 'sign off each page'."
argument-hint: 'The cached Figma design spec / list of frames to plan'
---

# Design Walkthrough Planning

Turn a multi-frame design into an ordered, gated build plan. Each page is built and **accepted by the
user before moving to the next**. The walkthrough is a living document the user can edit directly.

## When to Use

- A design has more than one frame/screen to build.
- You need explicit acceptance gates and a shared progress tracker.
- Acceptance criteria need to be visible and editable by the user.

## Where the walkthrough lives

Create a workspace file: `design/walkthrough-<slug>.md` (visible and editable by the user — NOT in
agent memory). Keep it in sync as work progresses. Use the
[walkthrough template](./assets/walkthrough-template.md).

## Procedure

### 1. Build the plan

- Read the cached design spec (from `figma-design-extraction`).
- Order the frames into a sensible build sequence (shared layout/components first, then journey order).
- For each page, write:
  - The target view file and route.
  - The GOV.UK components involved.
  - **Acceptance criteria** — specific, checkable statements of "done" (layout, content, components,
    responsive behaviour, interactions).
- Note dependencies between pages (e.g. a form's POST target).

### 2. Present the plan and get the user to confirm criteria

- Show the full ordered walkthrough.
- Tell the user they can edit acceptance criteria directly in `design/walkthrough-<slug>.md`.
- Ask for confirmation before building page 1.

### 3. Build one page at a time (gated)

For each page in order:

1. Mark it **in progress** in the walkthrough.
2. Build it using the `govuk-prototype-developer` skill.
3. Run `npm run dev`, compare against the reference image, self-check each acceptance criterion.
4. Present the result to the user for a walkthrough: what was built, how it maps to the frame, and the
   acceptance-criteria status.
5. **Wait for explicit user acceptance.** Do not start the next page until the user accepts.
   - If the user requests changes, iterate on the _same_ page and re-present.
   - Re-read the walkthrough file first in case the user edited criteria.
6. On acceptance, mark the page **accepted** and move to the next.

### 4. Iterate until acceptance

- Never batch multiple unaccepted pages.
- Keep the walkthrough's status column current at every transition.
- When all pages are accepted, summarise the completed journey and any follow-ups.

## Status model

Each page moves through: `not started` → `in progress` → `built (awaiting sign-off)` → `accepted`.
Only one page should be `in progress` / `awaiting sign-off` at a time.

## Rules

- **Acceptance gate is mandatory.** No page proceeds without explicit user sign-off.
- **User owns the criteria.** If the user edits acceptance criteria in the walkthrough file, honour the
  edited version — re-read before building/iterating.
- **Keep it detailed.** Vague criteria ("looks right") aren't acceptable — make them concrete and checkable.
