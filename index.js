'use strict';

const {promisify} = require('util');
const {realpath} = require('fs');

const inspectWithKind = require('inspect-with-kind');
const isPlainObj = require('is-plain-obj');
const which = require('which');

const ARG_ERROR = 'Expected 1 or 2 arguments (<string>[, <Object>])';
const TYPE_ERROR = 'Expected an executable name inside the PATH (<string>), for exmaple `ls`, `git` and `node`';
const OPTION_ERROR = 'Expected an option object to be passed to `node-which` https://www.npmjs.com/package/which (`null` by default)';
const promisifiedRealpath = promisify(realpath);
const promisifiedWhich = promisify(which);

module.exports = async function realExecutablePath(...args) {
	const argLen = args.length;

	if (argLen === 0) {
		const error = new RangeError(`${ARG_ERROR}, but got no arguments.`);
		error.code = 'ERR_MISSING_ARGS';

		throw error;
	}

	if (argLen !== 1 && argLen !== 2) {
		throw new RangeError(`${ARG_ERROR}, but got ${argLen} arguments.`);
	}

	const [cmd, options] = args;

	if (typeof cmd !== 'string') {
		const error = new TypeError(`${TYPE_ERROR}, but got a non-string value ${inspectWithKind(cmd)}.`);
		error.code = 'ERR_INVALID_ARG_TYPE';

		throw error;
	}

	if (cmd.length === 0) {
		throw new Error(`${TYPE_ERROR.replace(' (<string>)', '')}, but got '' (empty string).`);
	}

	if (argLen === 1) {
		return promisifiedRealpath(await promisifiedWhich(cmd));
	}

	if (!isPlainObj(options)) {
		throw new TypeError(`${OPTION_ERROR}, but got ${inspectWithKind(options)}.`);
	}

	if (options.all) {
		throw new Error(`\`all\` option is not supported, but a value ${
			inspectWithKind(options.all)
		} was provided.`);
	}

	return promisifiedRealpath(await promisifiedWhich(cmd, options));
};
