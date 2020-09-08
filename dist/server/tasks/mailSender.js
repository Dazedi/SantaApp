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
const Wish_1 = require("../models/Wish");
const Mailer_1 = require("../utils/Mailer");
const Scheduler_1 = require("../utils/Scheduler");
const RunFunction = () => __awaiter(void 0, void 0, void 0, function* () {
    const unsentWishes = yield Wish_1.Wish.getUnsentWishes();
    if (unsentWishes.length > 0) {
        yield Promise.all(unsentWishes.map((wish) => __awaiter(void 0, void 0, void 0, function* () {
            const textBody = [
                `Name: ${wish.username}`,
                `Address: ${wish.address}`,
                `Message: ${wish.message}`
            ];
            const success = Mailer_1.Mailer.sendMail({
                from: "do_not_reply@northpole.com",
                to: "santa@northpole.com",
                subject: `New wish from ${wish.username}`,
                text: textBody.join("\n"),
            });
            if (success) {
                yield Wish_1.Wish.updateWish(wish.id, { sent: true });
                return true;
            }
            return false;
        })));
    }
    else {
        console.log("No pending mails");
    }
});
exports.default = (pattern) => Scheduler_1.default({
    pattern,
    run: RunFunction
});
