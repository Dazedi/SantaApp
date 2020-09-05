"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
const config_1 = require("./config/config");
const v1_1 = require("./routes/v1");
require("./tasks/mailSender");
app.use(bodyParser());
app.use(morgan(config_1.default.env === "development" ? "dev" : "combined"));
app.use(express.static('public'));
app.get('/', (request, response) => {
    console.log(__dirname);
    response.sendFile(__dirname + '/index.html');
});
app.use('/v1', v1_1.default);
const listener = app.listen(process.env.PORT || 3000, () => {
    const addr = listener.address();
    console.log(`Your app is listening on port ${typeof addr === "object" ? addr === null || addr === void 0 ? void 0 : addr.port : "unknown"}`);
});
