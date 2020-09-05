import * as cron from "node-cron";
import { Wish } from "../models/Wish";
import { Mailer } from "../utils/Mailer";

/**
 * Send mail to santa every 15 minutes
 */
cron.schedule('*/15 * * * *', async () => {
    const unsentWishes = await Wish.getUnsentWishes();
    if (unsentWishes.length > 0) {
        unsentWishes.forEach((wish) => {
            const textBody = [
                `Name: ${wish.username}`,
                `Address: ${wish.address}`,
                `Message: ${wish.message}`
            ];
            Mailer.sendMail({
                from: "do_not_reply@northpole.com",
                to: "santa@northpole.com",
                subject: `New wish from ${wish.username}`,
                text: textBody.join("\n"),
            }).then((result) => {
                if (result) {
                    Wish.updateWish(wish.id, { sent: true });
                }
            })
        })
    } else {
        console.log("No pending mails");
    }
})