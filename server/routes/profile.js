const router = require('express').Router();
const { authCheck } = require('../middleware/auth');
const { Profile } = require('../models');

router.get('', authCheck, (req, res) => {
  const { user } = req;
  Profile.findOne({ where: { userId: parseInt(user.id) } })
    .then(profile => {
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
      return res.status(200).json({ message: 'Success', profile });
    })
    .catch(err => {
      return res.status(500).json({ message: 'Server Error', err });
    });
});

router.post('', authCheck, (req, res) => {
  const { user } = req;
  const {
    bio,
    dateOfBirth,
    department,
    school,
    yearOfGraduation,
    contactAddress,
    state,
    profession,
    company,
    companyAddress,
    role,
  } = req.body;

  Profile.findOrCreate({
    where: { userId: parseInt(user.id) },
    defaults: {
      bio,
      dateOfBirth,
      department,
      school,
      yearOfGraduation,
      contactAddress,
      state,
      profession,
      company,
      companyAddress,
      role,
    },
  })
    .then(([profile, created]) => {
      return res
        .status(200)
        .json({ satus: 'Profile Updated', profile, created });
    })
    .catch(err => {
      return res.status(500).json({ status: 'Error occurred', err });
    });
});

router.get('/all', (req, res) => {
  Profile.findAll({ attributes: { exclude: ['userId'] } }).then(profiles => {
    return res.status(200).json({ members: profiles, status: 'Success' });
  });
});

module.exports = router;
