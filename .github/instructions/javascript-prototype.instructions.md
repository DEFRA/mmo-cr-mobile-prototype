---
description: 'Use when editing server-side JavaScript for the GOV.UK Prototype Kit — routes (routes.js), Nunjucks filters (filters.js), session data defaults, and client-side application.js. Covers CommonJS patterns, the kit APIs, and form/branching logic.'
applyTo: 'app/**/*.js'
---

# JavaScript (GOV.UK Prototype Kit)

Server-side JS is **CommonJS** (`require` / `module.exports`). Follow Prettier: no semicolons, single
quotes, no trailing commas, 2-space indent.

## Routes — `app/routes.js`

```js
const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Render a page
router.get('/check-answers', (req, res) => {
  res.render('check-answers')
})

// Handle a form: store to session, branch, redirect
router.post('/eligibility', (req, res) => {
  if (req.session.data['hasLicence'] === 'yes') {
    res.redirect('/next-step')
  } else {
    res.redirect('/not-eligible')
  }
})
```

- Form values are auto-saved to `req.session.data` by the kit (keyed by input `name`).
- Prefer `res.redirect` after POST (Post/Redirect/Get); render on GET.
- Keep route logic simple — this is a prototype, not production.

## Filters — `app/filters.js`

```js
const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

addFilter('currency', (value) => '£' + Number(value).toFixed(2))
```

- Use filters for view-only formatting; reference in templates as `{{ value | currency }}`.

## Session data defaults — `app/data/session-data-defaults.js`

```js
module.exports = {
  // starting values available to every page as `data[...]`
}
```

- Set default answers/state here so pages render before the user has entered data.

## Client-side — `app/assets/javascripts/application.js`

```js
window.GOVUKPrototypeKit.documentReady(() => {
  // progressive enhancement only
})
```

- Keep client JS minimal and progressively enhancing; the prototype must work without it.

## Conventions

- CommonJS everywhere server-side (match `routes.js` / `filters.js`).
- No semicolons, single quotes, no trailing commas (Prettier `3.6.2`).
- Run `npm run format` before finishing.
- Route docs: https://prototype-kit.service.gov.uk/docs/create-routes ·
  Filters: https://prototype-kit.service.gov.uk/docs/filters
