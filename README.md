# real-executable-path

[![NPM version](https://img.shields.io/npm/v/real-executable-path.svg)](https://www.npmjs.com/package/real-executable-path)
[![Build Status](https://travis-ci.org/shinnn/real-executable-path.svg?branch=master)](https://travis-ci.org/shinnn/real-executable-path)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/real-executable-path.svg)](https://coveralls.io/github/shinnn/real-executable-path)
[![Dependency Status](https://david-dm.org/shinnn/real-executable-path.svg)](https://david-dm.org/shinnn/real-executable-path)
[![devDependency Status](https://david-dm.org/shinnn/real-executable-path/dev-status.svg)](https://david-dm.org/shinnn/real-executable-path#info=devDependencies)

Find the first instance of an executable in the PATH, with expanding all symbolic links

```javascript
const realExecutablePath = require('real-executable-path');
const which = require('which');

which('npm', (err, binPath) => {
  binPath; //=> '/usr/local/bin/npm'
});

realExecutablePath('npm').then(binPath => {
  binPath; //=> '/usr/local/lib/node_modules/npm/bin/npm-cli.js'
});
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install real-executable-path
```

## API

```javascript
const realExecutablePath = require('real-executable-path');
```

### realExecutablePath(*binName* [, *options*])

*binName*: `String` (an executable name in the PATH)  
*options*: `Object` ([`node-which` options](https://github.com/npm/node-which#options) except for `all`)  
Return: [`Promise`](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-constructor) instance

It finds the first instance of the given executable in the [PATH](http://pubs.opengroup.org/onlinepubs/000095399/basedefs/xbd_chap08.html#tag_08_03) environment variable, expands all symbolic links and resolves the canonicalized absolute pathname.

```javascript
realExecutablePath('this_cmd_not_installed').catch(err => {
  err.message; //=> 'not found: this_cmd_not_installed'
  err.code; //=> 'ENOENT'
});
```

## Related projects

* [real-executable-path-callback](https://github.com/shinnn/real-executable-path-callback) ([Callback](http://thenodeway.io/posts/understanding-error-first-callbacks/)-style version)
* [real-executable-paths](https://github.com/shinnn/real-executable-paths) (Returns all matched paths, instead of just the first one)
* [real-which](https://github.com/shinnn/real-which) (CLI)

## License

Copyright (c) 2015 - 2016 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
