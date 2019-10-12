const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path =  require('path');
const logger = require('morgan');
// const users = require('./routes/api/users');

const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Body Parser Middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Deployment Purpose
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")));


const port = process.env.PORT || 5000;


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
