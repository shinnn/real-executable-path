'use strict';

const {join, resolve} = require('path');

const realExecutablePath = require('.');
const test = require('tape');

process.env.PATH = join('node_modules', '.bin');

test('realExecutablePath()', async t => {
	t.equal(
		await realExecutablePath('eslint'),
		resolve('node_modules/eslint/bin/eslint.js'),
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
