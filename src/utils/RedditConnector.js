/** * Reddit-API-Crawler * * Copyright © 2017-present MindLabs, LLC. All rights reserved. * * This source code is licensed under the MIT license found in the * LICENSE.txt file in the root directory of this source tree. */

import Snoowrap from 'snoowrap';
import config from './../config';

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
export default class RedditConnector {
  constructor(...args) {
    this.args = args;
    this.connector = new Snoowrap({
      userAgent: config.Reddit.userAgent,
      accessToken: config.Reddit.accessToken,
    });
  }
  async getRandomSubReddit(options) {
    console.info('start fetching reddit api getRandomSubReddit');
    try {
      const data = await this.connector
        .getSubreddit(options.subreddit)
        .getRandomSubmission();
      return data;
    } catch (err) {
      throw err;
    }
  }
  async getNewForGivenSubReddit(options) {
    console.info('start fetching reddit api getNewForGivenSubReddit');
    try {
      const data = await this.connector
        .getSubreddit(options.subreddit)
        .getNew({ limit: options.limit ? options.limit : 100 });
      return data;
    } catch (err) {
      throw err;
    }
  }

  async getHotForGivenSubReddit(options) {
    console.info('start fetching reddit api getHotForGivenSubReddit');
    try {
      const data = await this.connector
        .getSubreddit(options.subreddit)
        .getHot({ limit: options.limit ? options.limit : 100 });
      return data;
    } catch (err) {
      throw err;
    }
  }
  async getRisingForGivenSubReddit(options) {
    console.info('start fetching reddit api getRisingForGivenSubReddit');
    try {
      const data = await this.connector
        .getSubreddit(options.subreddit)
        .getRising({ limit: options.limit ? options.limit : 100 });
      return data;
    } catch (err) {
      throw err;
    }
  }

  async search(options) {
    console.info('start fetching reddit api getRisingForGivenSubReddit');
    try {
      const data = await this.connector
        .getSubreddit(options.subreddit)
        .search({ limit: options.limit ? options.limit : 100 });
      return data;
    } catch (err) {
      throw err;
    }
  }
}
