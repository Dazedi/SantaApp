import { Wish } from "../models/Wish";
import { Mailer } from "../utils/Mailer";
import Scheduler from "../utils/Scheduler";

const RunFunction = async () => {
  const unsentWishes = await Wish.getUnsentWishes();
  if (unsentWishes.length > 0) {
    await Promise.all(unsentWishes.map(async (wish) => {
      const textBody = [
        `Name: ${wish.username}`,
        `Address: ${wish.address}`,
        `Message: ${wish.message}`
      ];
      const success = Mailer.sendMail({
        from: "do_not_reply@northpole.com",
        to: "santa@northpole.com",
        subject: `New wish from ${wish.username}`,
        text: textBody.join("\n"),
      });

      if (success) {
        await Wish.updateWish(wish.id, { sent: true });
        return true;
      }
      return false;
    }));
  } else {
    console.log("No pending mails");
  }
};

export default (pattern: string) => Scheduler({
  pattern,
  run: RunFunction
});
