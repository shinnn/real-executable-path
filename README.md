# real-executable-path

[![npm version](https://img.shields.io/npm/v/real-executable-path.svg)](https://www.npmjs.com/package/real-executable-path)
[![Build Status](https://travis-ci.com/shinnn/real-executable-path.svg?branch=master)](https://travis-ci.com/shinnn/real-executable-path)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/real-executable-path.svg)](https://coveralls.io/github/shinnn/real-executable-path)

A [Node.js](https://nodejs.org) module to find the first instance of an executable in the PATH, with expanding all symbolic links

```javascript
const realExecutablePath = require('real-executable-path');

(async () => {
  await realExecutablePath('npm'); //=> '/usr/local/lib/node_modules/npm/bin/npm-cli.js'
})();
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/about-npm/).

```
npm install real-executable-path
```

## API

```javascript
const realExecutablePath = require('real-executable-path');
```

### realExecutablePath(*binName* [, *options*])

*binName*: `string` (an executable name in the PATH)  
*options*: `Object` ([`node-which` options](https://github.com/npm/node-which#options) except for `all`)  
Return: `Promise<string>`

It finds the first instance of the given executable in the [PATH](http://pubs.opengroup.org/onlinepubs/000095399/basedefs/xbd_chap08.html#tag_08_03) environment variable, expands all symbolic links and resolves the canonicalized absolute pathname.

## Related projects

* [real-executable-paths](https://github.com/shinnn/real-executable-paths) – Returns all matched paths, instead of just the first one
* [real-which](https://github.com/shinnn/real-which) – CLI

## License

[ISC License](./LICENSE) © 2017 - 2019 Shinnosuke Watanabe
