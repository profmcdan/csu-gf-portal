const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models').User;
const { google } = require('./keys');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: google.clientID,
      clientSecret: google.clientSecret,
      callbackURL: '/api/auth/google/redirect',
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      const { id, given_name, family_name, email, picture } = profile;
      User.findOne({
        where: { googleId: id },
      })
        .then(user => {
          if (user) {
            done(null, user);
          } else {
            // Create User
            User.create({
              googleId: id,
              firstName: given_name,
              lastName: family_name,
              email,
              photo: picture,
            })
              .then(newUser => {
                return done(null, newUser);
              })
              .catch(err => {
                console.log(err);
                return done(err, null);
              });
          }
        })
        .catch(err => {
          console.log(err);
          return done(err, {});
        });
    },
  ),
);
