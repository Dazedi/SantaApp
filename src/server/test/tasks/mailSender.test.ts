import { Test, Expect, Teardown, Timeout } from "alsatian";
import * as sinon from "sinon";
import MailSender from "../../tasks/mailSender";
import { Wish } from "../../models";

const mailSender = MailSender("* * * * * *");

export class MailSenderTestFixture {
  @Teardown
  public teardown() {
    sinon.restore();
  }

  @Test("should schedule a job")
  public async testStart() {
    mailSender.start();
    Expect(mailSender.cronJob).not.toBeNull;
  }

  @Test("should send mail")
  public async testRunWithWish() {
    const id = await Wish.createWish({
      address: "address",
      message: "message",
      username: "username"
    });

    await mailSender.run();

    const wish = await Wish.getWishById(id);
    Expect(wish).toBeDefined();
    Expect(wish?.sent).toEqual(true);
  }

  @Test("should not send mail")
  @Timeout(15000)
  public async testRunWithNoWish() {
    const logSpy = sinon.spy(console, "log");
    await mailSender.run();
    sinon.assert.calledWith(logSpy, "No pending mails");
  }
}
