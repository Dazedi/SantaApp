"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.use(express.static('public'));
const listener = app.listen(process.env.PORT || 3000, () => {
    const addr = listener.address();
    console.log(`Your app is listening on port ${addr && typeof addr === "string" ? addr : addr.port}`);
});
