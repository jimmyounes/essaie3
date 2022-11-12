const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();
var mustache = require('mustache-express');
var path = require('path');
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './src/views');
app.use('/images', express.static(__dirname +'/images')); 

router.get("/", (req, res) => {
  res.render('index.html');
});

app.use(express.static(path.resolve('./public')));

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
