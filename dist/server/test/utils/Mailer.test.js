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
exports.MailerTestFixture = void 0;
const alsatian_1 = require("alsatian");
const Mailer_1 = require("../../utils/Mailer");
class MailerTestFixture {
    getMailer() {
        const mailer = Mailer_1.Mailer.getMailer();
        alsatian_1.Expect(mailer).toBeDefined();
        alsatian_1.Expect(mailer instanceof Mailer_1.Mailer).toBeTruthy();
    }
    sendMail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const success = yield Mailer_1.Mailer.sendMail(options);
            alsatian_1.Expect(success).toBeTruthy();
        });
    }
    failToSendMail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const success = yield Mailer_1.Mailer.sendMail(options);
            alsatian_1.Expect(success).not.toBeTruthy();
        });
    }
}
__decorate([
    alsatian_1.Test("should return mailer")
], MailerTestFixture.prototype, "getMailer", null);
__decorate([
    alsatian_1.Test("should send mail after a bit"),
    alsatian_1.TestCase({
        from: "do_not_reply@northpole.com",
        to: "santa@northpole.com",
        subject: `New wish from test`,
        text: "test",
    }),
    alsatian_1.Timeout(15000)
], MailerTestFixture.prototype, "sendMail", null);
__decorate([
    alsatian_1.Test("should not send mail"),
    alsatian_1.TestCase({
        from: "fdsafdasfasd",
        to: "fsdafasdfsad",
        subject: `New wish from test`,
        text: "test",
    }),
    alsatian_1.Timeout(15000)
], MailerTestFixture.prototype, "failToSendMail", null);
exports.MailerTestFixture = MailerTestFixture;
