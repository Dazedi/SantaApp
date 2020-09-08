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
exports.Mailer = void 0;
const nodemailer_1 = require("nodemailer");
const config_1 = require("../config/config");
let _mailer;
class Mailer {
    constructor() {
        this.transporter = nodemailer_1.createTransport({
            host: config_1.default.smtp.host,
            port: config_1.default.smtp.port,
            secure: config_1.default.smtp.port === 465,
            auth: Object.assign({}, config_1.default.smtp.auth)
        });
    }
    static getMailer() {
        if (_mailer) {
            return _mailer;
        }
        else {
            return _mailer = new Mailer();
        }
    }
    static sendMail(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mailer = Mailer.getMailer();
                const info = yield mailer.transporter.sendMail(Object.assign({}, opts));
                console.log("Message sent: %s", info.messageId);
                return true;
            }
            catch (err) {
                console.error("Sending mail failed: ", err);
                return false;
            }
        });
    }
}
exports.Mailer = Mailer;
