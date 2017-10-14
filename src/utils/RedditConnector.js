/** * Reddit-API-Crawler * * Copyright © 2017-present MindLabs, LLC. All rights reserved. * * This source code is licensed under the MIT license found in the * LICENSE.txt file in the root directory of this source tree. */

import Snoowrap from 'snoowrap';
import request from 'request-promise-native';
import querystring from 'querystring';
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
  }

  isTokenExpires() {
    const currentDate = new Date();
    return currentDate - this.tokenAddedDate > this.tokenExirationTime;
  }
  async checkAndGenerateAccessToken() {
    if (this.token && !this.isTokenExpires()) {
      return;
    }
    const options = {
      uri: 'https://www.reddit.com/api/v1/access_token',
      method: 'POST',
      body: querystring.stringify({
        grant_type: 'password',
        username: config.Reddit.username,
        password: config.Reddit.password,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${config.Reddit.clientId}:${config.Reddit.clientSecret}`,
        ).toString('base64')}`,
      },
      timeout: 10000,
      followRedirect: true,
      maxRedirects: 10,
    };
    try {
      const data = await request(options);
      const parsedData = JSON.parse(data);
      this.token = parsedData.access_token;
      this.tokenAddedDate = new Date();
      this.tokenExirationTime = parsedData.expires_in * 1000;
      this.connector = new Snoowrap({
        userAgent: config.Reddit.userAgent,
        accessToken: this.token,
      });
    } catch (err) {
      throw err;
    }
  }
  async getRandomSubReddit(options) {
    console.info(
      options.subreddit,
      'start fetching reddit api getRandomSubReddit',
    );
    try {
      await this.checkAndGenerateAccessToken();
      const data = await this.connector
        .getSubreddit(options.subreddit)
        .getRandomSubmission();
      return data;
    } catch (err) {
      // avoid rejection
      return null;
    }
  }
  async getNewForGivenSubReddit(options) {
    console.info('start fetching reddit api getNewForGivenSubReddit');
    try {
      await this.checkAndGenerateAccessToken();
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
      await this.checkAndGenerateAccessToken();
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
      await this.checkAndGenerateAccessToken();
      console.info(789);
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
