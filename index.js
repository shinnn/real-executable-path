/*!
 * real-executable-path | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/real-executable-path
*/
'use strict';

var realExecutablePathCallback = require('real-executable-path-callback');
var PinkiePromise = require('pinkie-promise');

module.exports = function realExecutablePath(executableName, options) {
  return new PinkiePromise(function executor(resolve, reject) {
    realExecutablePathCallback(executableName, options, function callback(err, filePath) {
      if (err) {
        reject(err);
        return;
      }

      resolve(filePath);
    });
  });
};
