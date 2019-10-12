const authCheck = (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({ error: 'You have to be logged in' });
  }
  next();
};

module.exports = {
  authCheck,
};
