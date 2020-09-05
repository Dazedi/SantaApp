"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const Joi = require("@hapi/joi");
const luxon_1 = require("luxon");
class WishController {
}
exports.default = WishController;
WishController.createWish = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const schema = Joi.object().keys({
        username: Joi.string().required(),
        message: Joi.string().required()
    });
    const { value, error } = Joi.compile(schema)
        .prefs({ errors: { label: 'key' } })
        .validate(data);
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return res.status(400).json({
            status: 'error',
            message: errorMessage,
            data
        });
    }
    const user = yield models_1.User.getByUsername(value.username);
    if (!user) {
        return res.status(500).json({
            status: 'error',
            message: 'User not found',
            data
        });
    }
    const userProfile = yield models_1.UserProfile.getByUid(user.uid);
    if (!userProfile) {
        return res.status(500).json({
            status: 'error',
            message: 'UserProfile not found',
            data
        });
    }
    const birthdate = luxon_1.DateTime.fromFormat(userProfile.birthdate, 'yyyy/dd/MM');
    const now = luxon_1.DateTime.local();
    if (now >= birthdate.plus({ years: 11 })) {
        return res.status(500).json({
            status: 'error',
            message: 'User is more than 10 years old',
            data
        });
    }
    yield models_1.Wish.createWish({
        username: user.username,
        address: userProfile.address,
        message: value.message
    });
    res.status(201).json({
        status: 'success',
        message: 'Wish was created successfully',
    });
});
