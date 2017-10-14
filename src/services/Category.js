/** * Reddit-API-Crawler * * Copyright © 2017-present MindLabs, LLC. All rights reserved. * * This source code is licensed under the MIT license found in the * LICENSE.txt file in the root directory of this source tree. */

import Category from '../data/models/Category';

export default class CategoryService {
  constructor(...args) {
    this.args = args;
    this.entityProvider = Category;
  }

  async getAllCategories() {
    try {
      return await this.entityProvider.findAll();
    } catch (err) {
      throw err;
    }
  }
}
