---
name: figma-design-extraction
description: "Use when extracting, reading, or importing a Figma design into the workspace to build GOV.UK Prototype Kit pages. Connects to the Figma MCP server READ-ONLY, pulls every frame/screen in as few calls as possible to avoid rate limiting, and persists the full design spec to local repo memory. Triggers: 'build from Figma', 'replicate this Figma', 'Figma URL', 'Figma frame', 'import design', 'figma screenshot'."
argument-hint: 'Figma file/frame URL or attached design screenshot(s)'
---

# Figma Design Extraction

Turn a Figma file, frame, or screenshot into a structured, locally-cached design spec that the
GOV.UK Prototype developer workflow can build from — without repeatedly hitting the Figma API.

## Non-negotiable guardrails

- **READ-ONLY.** Never call any Figma tool that creates, updates, deletes, comments on, or otherwise
  mutates a Figma file. Only read/get operations are permitted. If a write-capable tool is the only
  option, STOP and tell the user.
- **Minimise Figma calls.** The Figma MCP server rate-limits aggressively. Pull _everything you can_
  in the fewest calls, then work entirely from the local cache. Do **not** re-fetch from Figma unless
  the user explicitly asks to "refresh" or "re-pull" the latest design.

## When to Use

- The user provides a Figma file/frame URL and wants it rebuilt as prototype pages.
- The user attaches Figma screenshots instead of a URL.
- A previously cached design needs a re-pull ("refresh from Figma").

## Inputs

1. **Figma URL** — a file or frame link, e.g. `https://www.figma.com/design/<fileKey>/<name>?node-id=<id>`.
   The `node-id` identifies a specific frame; without it you have the whole file.
2. **Screenshots** — one or more attached images when no URL/MCP access is available.

If neither is provided, ask the user for the Figma URL or screenshots before proceeding.

## Procedure

### 1. Confirm Figma MCP availability

- Check that a Figma MCP server is connected (tools typically namespaced `figma/*` — e.g. a Dev Mode
  server exposing get-code / get-image / get-variable-defs / get-metadata style read tools).
- If no Figma MCP server is available, tell the user how to enable it (VS Code: MCP: add the Figma Dev
  Mode server and enable Dev Mode in the Figma desktop app), then fall back to screenshots if provided.

### 2. Pull the design in one shot (read-only)

Extract as much as possible per call. For the target node (or whole file), capture:

- **Structure/metadata**: frame names, hierarchy, page order, node IDs, sizes, and layout (auto-layout,
  spacing, alignment, constraints).
- **Rendered images**: a reference image per frame/screen for visual fidelity.
- **Design tokens/variables**: colours, typography, spacing scales, component names.
- **Text content**: every visible label, heading, body copy, hint, button text, error message.

If the file has multiple top-level frames, enumerate them first (metadata), then pull each frame's
detail — but batch aggressively and stop as soon as you have enough to build every screen.

### 3. Persist to local repo memory (source of truth)

Write the extracted spec to repo-scoped memory so later steps never need Figma again:

- Store under repo memory as `figma-design-<slug>.md` (one file per Figma file/design).
- Save rendered reference images into `design/figma/<slug>/` in the workspace (create the folder).
- Record: file key, node IDs, extraction timestamp, per-frame spec (see template), and the token map.

Use the [design spec template](./assets/design-spec-template.md) as the structure for the memory file.

### 4. Break down into separate page designs

- Map each Figma frame/screen to one intended prototype page (a Nunjucks view + route).
- Identify shared elements (headers, footers, navigation, repeated components) once, and note reuse.
- Flag anything that maps to a standard GOV.UK component vs. something needing custom work.
- Produce an ordered list of pages — this feeds the `design-walkthrough-planning` skill.

### 5. Report

Return: number of frames found, the page list (in build order), where the spec/images were cached,
and any ambiguities that need user clarification before planning.

## Mapping Figma → GOV.UK

While extracting, tag each region with its likely GOV.UK equivalent so the build step is fast:

| Figma pattern                       | Likely GOV.UK component                                   |
| ----------------------------------- | --------------------------------------------------------- |
| Top bar with crown/logo             | GOV.UK header                                             |
| Vertical stack of labelled inputs   | Form with `govukInput` / `govukDateInput` / `govukSelect` |
| Primary green button                | `govukButton`                                             |
| List of tappable rows with chevrons | Task list / summary list / links                          |
| Radio/checkbox groups               | `govukRadios` / `govukCheckboxes`                         |
| Back link top-left                  | `govukBackLink`                                           |
| Coloured status pills               | `govukTag`                                                |
| Full-width banner                   | `govukNotificationBanner` / phase banner                  |

Never invent bespoke markup for something the Design System already provides.

## Refresh policy

Only re-pull from Figma when the user says so (e.g. "refresh from Figma", "the design changed").
Otherwise treat the cached memory spec as authoritative and build from it.
