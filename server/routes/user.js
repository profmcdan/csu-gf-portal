const passport = require('passport');
const router = require('express').Router();
const { authCheck } = require('../middleware/auth');

router.get('', (req, res) => {
  return res.status(200).json({ message: 'Hurray!!!' });
});

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get(
  '/login',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  return res.status(200).json({ status: 'Created', user: req.user });
});

router.get('/logout', (req, res) => {
  req.logout();
  return res.json({ status: 'Logged Out' });
});

router.get('/profile', authCheck, (req, res) => {
  return res.status(200).json({ message: 'Logged in' });
});

router.get('/google/failure', (req, res) => {
  return res.status(403).json({ message: 'Error logging in' });
});

module.exports = router;
