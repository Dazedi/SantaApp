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
exports.WishServiceTestFixture = void 0;
const WishService_1 = require("../../services/WishService");
const alsatian_1 = require("alsatian");
class WishServiceTestFixture {
    failToCreateWish(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield WishService_1.default.createWish(data);
                console.log(result);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    createWish(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield WishService_1.default.createWish(data);
                console.log(result);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
__decorate([
    alsatian_1.Test("Should not create a wish"),
    alsatian_1.TestCase({}),
    alsatian_1.TestCase({ username: "aaaa" }),
    alsatian_1.TestCase({ username: "aaaa", message: "aaaa" }),
    alsatian_1.TestCase({ username: "james.bond", message: "aaaa" })
], WishServiceTestFixture.prototype, "failToCreateWish", null);
__decorate([
    alsatian_1.Test("Should create a wish"),
    alsatian_1.TestCase({ username: "charlie.brown", message: "aaaa" }),
    alsatian_1.TestCase({ username: "bugs.bunny", message: "aaaa" })
], WishServiceTestFixture.prototype, "createWish", null);
exports.WishServiceTestFixture = WishServiceTestFixture;
