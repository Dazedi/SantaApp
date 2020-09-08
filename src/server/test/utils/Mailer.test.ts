import { Test, TestCase, Expect, Timeout } from "alsatian";
import { Mailer, ISendMail } from "../../utils/Mailer";

export class MailerTestFixture {
  @Test("should return mailer")
  public getMailer() {
    const mailer = Mailer.getMailer();
    Expect(mailer).toBeDefined();
    Expect(mailer instanceof Mailer).toBeTruthy();
  }

  @Test("should send mail after a bit")
  @TestCase({
    from: "do_not_reply@northpole.com",
    to: "santa@northpole.com",
    subject: `New wish from test`,
    text: "test",
  })
  @Timeout(15000)
  public async sendMail(options: ISendMail) {
    const success = await Mailer.sendMail(options);
    Expect(success).toBeTruthy();
  }

  @Test("should not send mail")
  @TestCase({
    from: "fdsafdasfasd",
    to: "fsdafasdfsad",
    subject: `New wish from test`,
    text: "test",
  })
  @Timeout(15000)
  public async failToSendMail(options: ISendMail) {
    const success = await Mailer.sendMail(options);
    Expect(success).not.toBeTruthy();
  }
}
