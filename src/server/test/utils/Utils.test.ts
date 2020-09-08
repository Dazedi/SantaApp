import { Test, TestCase, Expect } from "alsatian";
import Utils from "../../utils/Utils";

export class UtilsTestFixture {

  @Test("should pick value from object")
  @TestCase(["a"])
  @TestCase(["a", "b"])
  @TestCase([1])
  @TestCase(["a-b-c"])
  @TestCase(["a-b-c", "a", "b", 1])
  public pickValueOK(pickFields: string[]) {
    const testObject = {
      a: "a",
      b: {
        c: "c",
        d: "d"
      },
      1: 1,
      "a-b-c": "a-b-c"
    };

    const result = Utils.pick(testObject, pickFields);

    for (let i = 0; i < pickFields.length; i++) {
      Expect(result[pickFields[i]]).toEqual(testObject[pickFields[i]]);
    }
  }
}
