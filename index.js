/*!
 * real-executable-path | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/real-executable-path
*/
'use strict';

const realExecutablePathCallback = require('real-executable-path-callback');

module.exports = function realExecutablePath(executableName, options) {
  return new Promise(function executor(resolve, reject) {
    realExecutablePathCallback(executableName, options, function callback(err, filePath) {
      if (err) {
        reject(err);
        return;
      }

      resolve(filePath);
    });
  });
};
