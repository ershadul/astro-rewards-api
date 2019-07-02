const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config');
const tenantMiddleware = require('./middlewares/tenant');

const app = express();
const server = http.createServer(app);

const router = express.Router();
app.use(router);

const dbUrl = config.DB_URL;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(tenantMiddleware);

app.use((err, req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Missing authentication credentials.');
  }
  next();
});

server.listen(config.PORT, (err) => {
  if (err) { process.exit(1); }
  mongoose.set('useFindAndModify', false);

  // connect to db
  mongoose.connect(dbUrl, { useNewUrlParser: true });

  mongoose.connection.on('error', (dbError) => {
    if (dbError) { process.exit(1); }
  });

  fs.readdirSync(path.join(__dirname, '/routes')).map((file) => {
    require(`./routes/${file}`)(app);
  });
});

router.get('/_status', (req, res) => {
  res.send('Status OK!');
});

module.exports = app;
