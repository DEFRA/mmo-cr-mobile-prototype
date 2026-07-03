//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// Sign in: redirect to account overview on submit
router.post('/sign-in', (req, res) => {
  res.redirect('/account-overview')
})
