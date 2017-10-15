import { CronJob } from 'cron';
import RedditCrawler from '../services/RedditCrawler';

export default class CronUtil {
  constructor(...args) {
    this.args = args;
    this.CronJob = CronJob;
  }

  async setCrawlerCron() {
    const options = {
      // runs every 1 minute
      cronTime: '* * * * *',
      onTick() {
        try {
          console.info('cron crawler starts execution');
          const RedditCrawlerInstance = new RedditCrawler();

          RedditCrawlerInstance.startCrawl();
        } catch (err) {
          console.info('crawler error ', err);
        }
      },
      onComplete() {
        console.info(' cron jobs stopped');
      },
      start: true,
    };
    const job = new this.CronJob(options);
    console.info('job status', job.running);
  }
}
