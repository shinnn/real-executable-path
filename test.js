'use strict';

const path = require('path');

const realExecutablePath = require('.');
const test = require('tape');

process.env.PATH = path.join('node_modules', '.bin');

test('realExecutablePath()', t => {
  t.plan(6);

  t.equal(realExecutablePath.name, 'realExecutablePath', 'should have a function name.');

  realExecutablePath('eslint').then(binPath => {
    t.equal(
      binPath,
      path.resolve('node_modules/eslint/bin/eslint.js'),
      'should resolve an executable path.'
    );
  }).catch(t.fail);

  realExecutablePath('foobarbazqux', null).then(t.fail, err => {
    t.equal(err.message, 'not found: foobarbazqux', 'should fail when it cannot find a path.');
  }).catch(t.fail);

  realExecutablePath('eslint', {path: 'foobarbazqux'}).then(t.fail, err => {
    t.equal(err.message, 'not found: eslint', 'should accept options.');
  }).catch(t.fail);

  realExecutablePath(['array'], undefined).then(t.fail, err => {
    t.equal(
      err.message,
      '[ \'array\' ] is not a string. Expected a string of a specific executable name in the PATH.',
      'should fail when it takes an invalid argument.'
    );
  }).catch(t.fail);

  realExecutablePath().then(t.fail, err => {
    t.equal(
      err.message,
      'undefined is not a string. Expected a string of a specific executable name in the PATH.',
      'should fail when it takes no arguments.'
    );
  }).catch(t.fail);
});
