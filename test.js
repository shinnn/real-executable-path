'use strict';

const {join} = require('path');

const realExecutablePath = require('.');
const test = require('tape');

process.env.PATH = join('node_modules', '.bin');

test('realExecutablePath()', async t => {
	t.equal(
		await realExecutablePath('eslint'),
		join(__dirname, 'node_modules', ...process.platform === 'win32' ? ['.bin', 'eslint.CMD'] : ['eslint', 'bin', 'eslint.js']),
		'should resolve an executable path.'
	);

	try {
		await realExecutablePath('foobarbazqux');
	} catch ({message}) {
		t.equal(message, 'not found: foobarbazqux', 'should fail when it cannot find a path.');
	}

	try {
		await realExecutablePath('eslint', {path: 'foobarbazqux'});
	} catch ({message}) {
		t.equal(message, 'not found: eslint', 'should accept options.');
	}

	try {
		await realExecutablePath([-0]);
	} catch ({message}) {
		t.equal(
			message,
			'Expected an executable name inside the PATH (<string>), for exmaple `ls`, `git` and `node`, but got a non-string value [ -0 ] (array).',
			'should fail when it takes an invalid argument.'
		);
	}

	try {
		await realExecutablePath('');
	} catch ({message}) {
		t.equal(
			message,
			'Expected an executable name inside the PATH, for exmaple `ls`, `git` and `node`, but got \'\' (empty string).',
			'should fail when it takes an empty path.'
		);
	}

	try {
		await realExecutablePath('_', [{}]);
	} catch ({message}) {
		t.equal(
			message,
			'Expected an option object to be passed to `node-which` https://www.npmjs.com/package/which (`null` by default), but got [ {} ] (array).',
			'should fail when it takes a non-plain options object.'
		);
	}

	try {
		await realExecutablePath('_', {all: true});
	} catch ({message}) {
		t.equal(
			message,
			'`all` option is not supported, but a value true (boolean) was provided.',
			'should fail when `all` option is enabled.'
		);
	}

	try {
		await realExecutablePath();
	} catch ({message}) {
		t.equal(
			message,
			'Expected 1 or 2 arguments (<string>[, <Object>]), but got no arguments.',
			'should fail when it takes no arguments.'
		);
	}

	try {
		await realExecutablePath('_', {}, {});
	} catch ({message}) {
		t.equal(
			message,
			'Expected 1 or 2 arguments (<string>[, <Object>]), but got 3 arguments.',
			'should fail when it takes too many arguments.'
		);
	}

	t.end();
});
