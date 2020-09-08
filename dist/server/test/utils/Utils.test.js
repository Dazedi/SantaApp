"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsTestFixture = void 0;
const alsatian_1 = require("alsatian");
const Utils_1 = require("../../utils/Utils");
class UtilsTestFixture {
    pickValueOK(pickFields) {
        const testObject = {
            a: "a",
            b: {
                c: "c",
                d: "d"
            },
            1: 1,
            "a-b-c": "a-b-c"
        };
        const result = Utils_1.default.pick(testObject, pickFields);
        for (let i = 0; i < pickFields.length; i++) {
            alsatian_1.Expect(result[pickFields[i]]).toEqual(testObject[pickFields[i]]);
        }
    }
}
__decorate([
    alsatian_1.Test("should pick value from object"),
    alsatian_1.TestCase(["a"]),
    alsatian_1.TestCase(["a", "b"]),
    alsatian_1.TestCase([1]),
    alsatian_1.TestCase(["a-b-c"]),
    alsatian_1.TestCase(["a-b-c", "a", "b", 1])
], UtilsTestFixture.prototype, "pickValueOK", null);
exports.UtilsTestFixture = UtilsTestFixture;
