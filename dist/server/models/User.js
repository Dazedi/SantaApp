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
exports.User = void 0;
const node_fetch_1 = require("node-fetch");
class User {
}
exports.User = User;
User.ENDPOINT = 'https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json';
User.getByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return node_fetch_1.default(User.ENDPOINT)
        .then((res) => {
        if (res.ok) {
            return res;
        }
        else {
            throw new Error("Unable to retrieve users");
        }
    })
        .then((res) => res.json())
        .then((data) => data.find((user) => user.username === username));
});
exports.default = User;
