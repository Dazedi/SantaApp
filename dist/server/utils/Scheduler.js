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
const cron = require("node-cron");
class Scheduler {
    constructor(schedulerOptions) {
        this.run = schedulerOptions.run;
        this.pattern = schedulerOptions.pattern;
        this.cronJob = null;
    }
    start() {
        if (!this.cronJob) {
            this.cronJob = cron.schedule(this.pattern, () => __awaiter(this, void 0, void 0, function* () {
                yield this.run();
            }));
        }
    }
    stop() {
        if (this.cronJob) {
            this.cronJob.stop;
            this.cronJob.destroy();
            this.cronJob = null;
        }
    }
}
exports.default = (schedulerOptions) => new Scheduler(schedulerOptions);
