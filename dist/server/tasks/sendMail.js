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
const node_cron_1 = require("node-cron");
const Wish_1 = require("../models/Wish");
const Mailer_1 = require("../utils/Mailer");
node_cron_1.default.schedule('*/1 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    const unsentWishes = yield Wish_1.Wish.getUnsentWishes();
    if (unsentWishes.length > 0) {
        unsentWishes.forEach((wish) => {
            const textBody = [
                `Name: ${wish.username}`,
                `Address: ${wish.address}`,
                `Message: ${wish.message}`
            ];
            Mailer_1.Mailer.sendMail({
                from: "do_not_reply@northpole.com",
                to: "santa@northpole.com",
                subject: `New wish from ${wish.username}`,
                text: textBody.join("\n"),
            });
        });
    }
    else {
        console.log("No pending mails");
    }
}));
