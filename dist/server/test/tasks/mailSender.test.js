"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.MailSenderTestFixture = void 0;
const alsatian_1 = require("alsatian");
const sinon = require("sinon");
const mailSender_1 = require("../../tasks/mailSender");
const models_1 = require("../../models");
const mailSender = mailSender_1.default("* * * * * *");
class MailSenderTestFixture {
    teardown() {
        sinon.restore();
    }
    testStart() {
        return __awaiter(this, void 0, void 0, function* () {
            mailSender.start();
            alsatian_1.Expect(mailSender.cronJob).not.toBeNull;
        });
    }
    testRunWithWish() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield models_1.Wish.createWish({
                address: "address",
                message: "message",
                username: "username"
            });
            yield mailSender.run();
            const wish = yield models_1.Wish.getWishById(id);
            alsatian_1.Expect(wish).toBeDefined();
            alsatian_1.Expect(wish === null || wish === void 0 ? void 0 : wish.sent).toEqual(true);
        });
    }
    testRunWithNoWish() {
        return __awaiter(this, void 0, void 0, function* () {
            const logSpy = sinon.spy(console, "log");
            yield mailSender.run();
            sinon.assert.calledWith(logSpy, "No pending mails");
        });
    }
}
__decorate([
    alsatian_1.Teardown
], MailSenderTestFixture.prototype, "teardown", null);
__decorate([
    alsatian_1.Test("should schedule a job")
], MailSenderTestFixture.prototype, "testStart", null);
__decorate([
    alsatian_1.Test("should send mail")
], MailSenderTestFixture.prototype, "testRunWithWish", null);
__decorate([
    alsatian_1.Test("should not send mail"),
    alsatian_1.Timeout(15000)
], MailSenderTestFixture.prototype, "testRunWithNoWish", null);
exports.MailSenderTestFixture = MailSenderTestFixture;
