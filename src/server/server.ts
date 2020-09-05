// server.js
// where your node app starts

// init project
import * as express from 'express';
import * as morgan from 'morgan';
const app = express();
import * as bodyParser from 'body-parser';
import config from "./config/config";
import routes from './routes/v1';
require("./tasks/mailSender");

app.use(bodyParser());
app.use(morgan(config.env === "development" ? "dev" : "combined"));

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  console.log(__dirname)
  response.sendFile(__dirname + '/index.html');
});

app.use('/v1', routes);

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  const addr = listener.address();
  console.log(`Your app is listening on port ${typeof addr === "object" ? addr?.port : "unknown"}`);
})