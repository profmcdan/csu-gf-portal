const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const logger = require('morgan');
const cookieSession = require('cookie-session');
const passportSetup = require('./server/config/passport-setup');
const { db } = require('./server/models');
const { cookieKey } = require('./server/config/keys');

const users = require('./server/routes/user');

const app = express();

// Log requests to the console.
app.use(logger('dev'));
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [cookieKey],
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// Body Parser Middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

// Deployment Purpose
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));

const port = process.env.PORT || 5000;

app.use('/api/auth', users);
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

// Sync Database
// db.sync({ force: true })
db.sync({ force: true }).then(() => {
  console.log('Database Synced Successfully');
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
