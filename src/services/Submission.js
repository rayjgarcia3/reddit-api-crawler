/* eslint-disable camelcase */
/** * Reddit-API-Crawler * * Copyright © 2017-present MindLabs, LLC. All rights reserved. * * This source code is licensed under the MIT license found in the * LICENSE.txt file in the root directory of this source tree. */

import Submission from '../data/mongo/models/submission';

export default class SubmissionService {
  constructor(...args) {
    this.args = args;
    this.EntityProvider = Submission;
  }

  async storeDataInDbFromAPIResponse(item) {
    try {
      if (item.length > 0) {
        return await Promise.all(
          item.map(i => this.storeDataInDbFromAPIResponse(i)),
        );
      }
      // console.log(9898, item.length, item.__proto__, 4848);

      if (item) {
        const exists = await this.checkSubmissionExistsByRedditId(
          await item.id,
        );
        console.info(11, exists, 22);
        if (!exists) {
          const data = await this.addRecordInDB(item);
          return data;
        }
      }
      return false;
    } catch (err) {
      console.info(12488, err);
      throw err;
    }
  }
  async checkSubmissionExistsByRedditId(id) {
    try {
      console.info(4004, id);
      return await this.EntityProvider.findOne({ redditId: id });
    } catch (err) {
      throw err;
    }
  }
  async addRecordInDB(item) {
    const {
      domain,
      thumbnail_width,
      thumbnail_height,
      thumbnail,
      over_18,
      title,
      subreddit_id,
      name,
      url,
      permalink,
      preview,
      id,
      local_url,
    } = item;
    // console.info(item, item.subreddit, item.subreddit.display_name);
    const newSubmission = new this.EntityProvider();
    newSubmission.domain = domain;
    newSubmission.thumbnail_width = thumbnail_width;
    newSubmission.redditId = id;
    newSubmission.thumbnail_height = thumbnail_height;
    newSubmission.thumbnail = thumbnail;
    newSubmission.title = title;
    newSubmission.over_18 = over_18;
    newSubmission.subreddit_id = subreddit_id;
    newSubmission.subreddit = await item.subreddit.display_name;
    newSubmission.permalink = permalink;
    newSubmission.name = name;
    newSubmission.url = url;
    newSubmission.author = await item.author.name;
    newSubmission.preview = preview;
    newSubmission.local_url = local_url;
    return newSubmission.save();
  }
}
