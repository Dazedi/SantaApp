"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const WishController_1 = require("../../controllers/WishController");
const router = express.Router();
router.route('/')
    .post(WishController_1.default.createWish);
exports.default = router;
