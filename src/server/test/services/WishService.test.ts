import WishService from "../../services/WishService";
// import * as sinon from 'sinon';
import { Test, TestCase } from "alsatian";

export class WishServiceTestFixture {
  @Test("Should not create a wish")
  @TestCase({})
  @TestCase({ username: "aaaa" })
  @TestCase({ username: "aaaa", message: "aaaa" })
  @TestCase({ username: "james.bond", message: "aaaa" })
  public async failToCreateWish(data: any) {
    try {
      const result = await WishService.createWish(data);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }

  @Test("Should create a wish")
  @TestCase({ username: "charlie.brown", message: "aaaa" })
  @TestCase({ username: "bugs.bunny", message: "aaaa" })
  public async createWish(data: any) {
    try {
      const result = await WishService.createWish(data);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }

}
