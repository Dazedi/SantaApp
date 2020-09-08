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
const luxon_1 = require("luxon");
class WishService {
}
exports.default = WishService;
WishService.createWish = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.getByUsername(data.username);
    if (!user) {
        throw "User not found";
    }
    const userProfile = yield models_1.UserProfile.getByUid(user.uid);
    if (!userProfile) {
        throw "UserProfile not found";
    }
    const birthdate = luxon_1.DateTime.fromFormat(userProfile.birthdate, 'yyyy/dd/MM');
    const now = luxon_1.DateTime.local();
    if (now >= birthdate.plus({ years: 11 })) {
        throw "User is more than 10 years old";
    }
    const success = yield models_1.Wish.createWish({
        username: user.username,
        address: userProfile.address,
        message: data.message
    });
    if (!success) {
        throw "Wish could not be created";
    }
    return "Wish was created successfully";
});
