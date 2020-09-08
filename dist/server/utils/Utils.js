"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
}
exports.default = Utils;
Utils.pick = (object, fields) => {
    let obj = {};
    for (const field of fields) {
        if (object &&
            typeof object === "object" &&
            Object.prototype.hasOwnProperty.call(object, field)) {
            obj[field] = object[field];
        }
    }
    return obj;
};
