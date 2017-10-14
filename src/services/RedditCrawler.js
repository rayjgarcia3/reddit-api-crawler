/** * Reddit-API-Crawler * * Copyright © 2017-present MindLabs, LLC. All rights reserved. * * This source code is licensed under the MIT license found in the * LICENSE.txt file in the root directory of this source tree. */

import RedditConnector from './../utils/RedditConnector';
import CategoryService from './Category';
import SubmissionService from './Submission';

export default class RedditCrawler {
  constructor(...args) {
    this.args = args;
    this.redditConnector = new RedditConnector();
    this.cotegoryService = new CategoryService();
    this.submissionService = new SubmissionService();
  }

  async startCrawl() {
    console.info('startCrawl');

    try {
      const categories = await this.cotegoryService.getAllCategories();
      const res = await Promise.all(
        categories.map(category =>
          this.redditConnector.getRandomSubReddit({
            subreddit: category.get('name'),
          }),
        ),
      );
      console.info(res, 1121111111111);
      const r = await Promise.all(
        res.map(item => {
          return this.submissionService.storeDataInDbFromAPIResponse(item);
        }),
      );
      console.log(r);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
