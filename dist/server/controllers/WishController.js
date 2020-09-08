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
const Joi = require("@hapi/joi");
const WishService_1 = require("../services/WishService");
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
    try {
        const result = yield WishService_1.default.createWish(value);
        res.status(201).json({
            status: 'success',
            message: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            status: 'error',
            message: err,
            data
        });
    }
});
