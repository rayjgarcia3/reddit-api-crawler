/** * Reddit-API-Crawler * * Copyright © 2017-present MindLabs, LLC. All rights reserved. * * This source code is licensed under the MIT license found in the * LICENSE.txt file in the root directory of this source tree. */

import config from './../config';
import RedditConnector from './../utils/RedditConnector';
/**
 * Options mixed object can containt selected params according to the docs
 * subreddit:name of queryable reddit
 * after:fullname of a thing
 * before:fullname of a thing
 * count:* positive integer (default: 0)
 * limit:the maximum number of items desired (default: 25, maximum: 100)
 * show:(optional) the string all
 * sr_detail:(optional) expand subreddits
 */
export default class RedditCrawler {
  constructor(...args) {
    this.args = args;
  }

  async startCrawl(options) {
    console.info('start fetching reddit api getRisingForGivenSubReddit');
    try {
      await this.checkAndGenerateAccessToken();
      const data = await this.connector
        .getSubreddit(options.subreddit)
        .search({ limit: options.limit ? options.limit : 100 });
      return data;
    } catch (err) {
      throw err;
    }
  }
}
