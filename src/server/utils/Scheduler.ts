import * as cron from "node-cron";

interface IScheduler {
  pattern: string;
  run: () => Promise<void>;
}

class Scheduler {
  public cronJob: cron.ScheduledTask | null;

  public run: () => Promise<void>;

  private pattern: string;

  constructor(schedulerOptions: IScheduler) {
    this.run = schedulerOptions.run;
    this.pattern = schedulerOptions.pattern;
    this.cronJob = null;
  }

  public start() {
    if (!this.cronJob) {
      this.cronJob = cron.schedule(this.pattern, async () => {
        await this.run();
      });
    }
  }

  public stop() {
    if (this.cronJob) {
      this.cronJob.stop;
      this.cronJob.destroy();
      this.cronJob = null;
    }
  }
}

export default (schedulerOptions: IScheduler) => new Scheduler(schedulerOptions);
