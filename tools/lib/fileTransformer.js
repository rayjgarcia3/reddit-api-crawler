/** * Reddit-API-Crawler * * Copyright © 2017-present MindLabs, LLC. All rights reserved. * * This source code is licensed under the MIT license found in the * LICENSE.txt file in the root directory of this source tree. */

const path = require('path');

// This is a custom Jest transformer turning file imports into filenames.
// http://facebook.github.io/jest/docs/tutorial-webpack.html
module.exports = {
  process(src, filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  },
};
