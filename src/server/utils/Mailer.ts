import { createTransport, Transporter } from "nodemailer";
import config from "../config/config";

let _mailer;

export interface ISendMail {
    text: string;
    from: string;
    to: string;
    subject: string;
}

export class Mailer {
    public transporter: Transporter;

    public static getMailer(): Mailer {
        if (_mailer) {
            return _mailer;
        } else {
            return _mailer = new Mailer();
        }
    }

    constructor() {
        this.transporter = createTransport({
            host: config.smtp.host,
            port: config.smtp.port,
            secure: config.smtp.port === 465,
            auth: {
              ...config.smtp.auth
            }
        })
    }

    public static async sendMail(opts: ISendMail) {
        try {
            const mailer = Mailer.getMailer();
            const info = await mailer.transporter.sendMail({
                ...opts
            });
            console.log("Message sent: %s", info.messageId);
            return true;
        } catch (err) {
            console.error("Sending mail failed: ", err);
            return false;
        }
    }
}
