const userRoutes = require('./user');
const profileRoutes = require('./profile');

const express = require('express');
const app = express();

app.use('/auth', userRoutes);
app.use('/profile', profileRoutes);

module.exports = app;
