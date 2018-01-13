'use strict';

const realExecutablePathCallback = require('real-executable-path-callback');

module.exports = async function realExecutablePath(...args) {
	const argLen = args.length;

	if (argLen !== 1 && argLen !== 2) {
		throw new RangeError(`Expected 1 or 2 arguments (<string>[, <Object>]), but got ${
			argLen === 0 ? 'no' : argLen
		} arguments.`);
	}

	return new Promise((resolve, reject) => {
		realExecutablePathCallback(...args, (err, filePath) => {
			if (err) {
				reject(err);
				return;
			}

			resolve(filePath);
		});
	});
};
