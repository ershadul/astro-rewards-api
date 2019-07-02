const bodyParser = require('body-parser'),
  express = require('express'),
  fs = require('fs'),
  http = require('http'),
  mongoose = require('mongoose'),
  path = require('path'),
  config = require('./config');

const app = express();
const server = http.createServer(app);

const router = express.Router();
app.use(router);

const dbUrl = config.DB_URL;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Missing authentication credentials.');
  }
  next();
});

server.listen(config.PORT, err => {
  if (err) { process.exit(1); }
  console.log('Server is up and running on port number 3000.');

  mongoose.set('useFindAndModify', false);

  //connect to db
  mongoose.connect(dbUrl, { useNewUrlParser: true });

  mongoose.connection.on('error', (err) => {
    console.log('error', err);
    if (err) { process.exit(1); }
  });

  fs.readdirSync(path.join(__dirname, '/routes')).map(file => {
    require('./routes/' + file)(app);
  });
});

router.get('/_status', (req, res) => {
  res.send('Status OK!');
});

module.exports = app;
