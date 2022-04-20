const { SENDGRID_API_KEY, SENDRGID_EMAIL } = require('../secret.js')

module.exports = () => ({
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: SENDGRID_API_KEY,
    },
    settings: {
      defaultFrom: SENDRGID_EMAIL,
      defaultReplyTo: SENDRGID_EMAIL,
    }
  }
})