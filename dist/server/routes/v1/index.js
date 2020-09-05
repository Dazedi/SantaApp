"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wish_1 = require("./wish");
const express = require("express");
const router = express.Router();
router.use('/wish', wish_1.default);
exports.default = router;
