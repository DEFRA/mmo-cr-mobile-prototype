//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const path = require('path')
const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Serve the service worker from the root so it controls the whole app
router.get('/sw.js', (req, res) => {
  res.set('Content-Type', 'application/javascript')
  res.sendFile(path.join(__dirname, 'assets/javascripts/sw.js'))
})

// Add your routes here

// Sign in: redirect to account overview on submit
router.post('/sign-in', (req, res) => {
  res.redirect('/account-overview')
})
