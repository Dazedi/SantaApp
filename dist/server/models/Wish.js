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
exports.Wish = void 0;
const wishes = [];
class Wish {
    static validateWishBase(data, update = false) {
        if (((!update && data.address) || update) && data.address === "") {
            console.error("Wish address cannot be empty");
            return { address: "Wish address cannot be empty" };
        }
        if (((!update && data.username) || update) && data.username === "") {
            console.error("Wish username cannot be empty");
            return { username: "Wish username cannot be empty" };
        }
        if (((!update && data.message) || update) && data.message === "") {
            console.error("Wish message cannot be empty");
            return { message: "Wish message cannot be empty" };
        }
        return null;
    }
}
exports.Wish = Wish;
Wish.createWish = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (Wish.validateWishBase(data)) {
        throw new Error(data.message);
    }
    const id = Math.ceil(Math.random() * 9999999);
    wishes.push(Object.assign(Object.assign({ id }, data), { sent: false }));
    return id;
});
Wish.updateWish = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (Wish.validateWishBase(data, true)) {
        throw new Error(data.message);
    }
    const wishIdx = wishes.findIndex((wish) => wish.id === id);
    if (wishIdx < 0)
        return false;
    wishes[wishIdx] = Object.assign(Object.assign({}, wishes[wishIdx]), data);
    return true;
});
Wish.getUnsentWishes = () => __awaiter(void 0, void 0, void 0, function* () {
    return wishes.filter((wish) => wish.sent === false);
});
Wish.getWishById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return wishes.find((wish) => wish.id === id);
});
exports.default = Wish;
