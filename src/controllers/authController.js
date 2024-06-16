const { createController } = require('awilix-express')

function authController({ repository }) {
  const authServices = repository.authServices

  return {
    signIn: (req, res) => {},
    signOut: (req, res) => {},
    forgotPassword: (req, res) => {},
    confirmOtp: (req, res) => {}
  }
}

module.exports = createController(authController)
  .prefix('/api/auth')
  .post('/sign-in', 'signIn')
  .post('/sign-out', 'signOut')
  .post('/forgot-password', 'forgotPassword')
  .post('/confirm-otp/:token', 'confirmOtp')
