/** * Reddit-API-Crawler * * Copyright © 2017-present MindLabs, LLC. All rights reserved. * * This source code is licensed under the MIT license found in the * LICENSE.txt file in the root directory of this source tree. */

import Snoowrap from 'snoowrap';
import config from './../config';
// NOTE: The following examples illustrate how to use snoowrap. However, hardcoding
// credentials directly into your source code is generally a bad idea in practice (especially
// if you're also making your source code public). Instead, it's better to either (a) use a separate
// config file that isn't committed into version control, or (b) use environment variables.

// Create a new snoowrap requester with OAuth credentials.
// For more information on getting credentials, see here: https://github.com/not-an-aardvark/reddit-oauth-helper

export default class RedditConnector {
  constructor(...args) {
    this.args = args;
    this.connector = new Snoowrap({
      userAgent: config.Reddit.userAgent,
      accessToken: config.Reddit.accessToken,
    });
  }
  async getData(options) {
    console.info('start fetching reddit api');
    try {
      const data = await this.connector
        .getSubreddit(options.subreddit)
        .getRandomSubmission({ limit: 100 });
      // console.info(data);
      return data;
    } catch (err) {
      throw err;
    }
  }
}
