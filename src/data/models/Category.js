/** * Reddit-API-Crawler * * Copyright © 2017-present MindLabs, LLC. All rights reserved. * * This source code is licensed under the MIT license found in the * LICENSE.txt file in the root directory of this source tree. */

import DataType from 'sequelize';
import Model from '../sequelize';

const Category = Model.define(
  'Category',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },
    parentId: {
      type: DataType.UUID,
    },
    name: {
      type: DataType.STRING(255),
      unique: true,
      validate: { isAlphanumeric: true },
    },
  },
  {
    indexes: [{ fields: ['name'] }],
  },
);

export default Category;
