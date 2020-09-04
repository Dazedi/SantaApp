// server.js
// where your node app starts

// init project
import * as express from 'express';
// import * as morgan from 'morgan';
const app = express();
// import * as bodyParser from 'body-parser';

// app.use(bodyParser());
// app.use(morgan());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
// app.get('/', (request, response) => {
//   response.sendFile(__dirname + '/views/index.html');
// });

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  const addr = listener.address();
  console.log(`Your app is listening on port ${addr && typeof addr === "string" ? addr : addr.port}`)
})