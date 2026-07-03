# Figma Design Spec — {design name}

> Cached extraction. Treat as the source of truth. Do NOT re-pull from Figma unless the user asks to refresh.

## Source

- **Figma file key**: {fileKey}
- **File / frame URL**: {url}
- **Root node-id(s)**: {nodeIds}
- **Extracted**: {ISO timestamp}
- **Reference images**: `design/figma/{slug}/`

## Design tokens

- **Colours**: {name → hex, mapped to nearest govuk-colour where possible}
- **Typography**: {styles → govuk-font sizes/weights}
- **Spacing scale**: {values → govuk spacing units}
- **Named components**: {list}

## Page / frame inventory (build order)

| #   | Frame name | Node ID | → Prototype page (view) | Route   | Reference image    |
| --- | ---------- | ------- | ----------------------- | ------- | ------------------ |
| 1   | {frame}    | {id}    | app/views/{page}.html   | /{path} | {slug}/{frame}.png |

## Shared elements

- {header / footer / nav / repeated components and where they are reused}

---

## Frame: {frame name}

- **Node ID**: {id}
- **Size / breakpoint**: {width x height, mobile/desktop}
- **Layout**: {auto-layout direction, spacing, alignment}
- **Reference image**: `design/figma/{slug}/{frame}.png`

### Content (verbatim)

- Heading: "{text}"
- Body: "{text}"
- Hints / labels: "{text}"
- Buttons / links: "{text}"
- Error / status messages: "{text}"

### GOV.UK component mapping

| Region   | GOV.UK component | Notes             |
| -------- | ---------------- | ----------------- |
| {region} | {govukComponent} | {variant, params} |

### Acceptance criteria

- [ ] {criterion — user-editable}

---

_(repeat the Frame block for every frame)_
