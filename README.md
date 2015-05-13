# Node.js Config Factory
[![Build Status](https://travis-ci.org/eddieajau/node-config-factory.svg?branch=master)](https://travis-ci.org/eddieajau/node-config-factory)

A simple wrapper for [`nconf`](https://www.npmjs.com/package/nconf) providing the ability to load configuration files in a directory.

## Installation

```sh
$ npm install @eddieajau/config-factory
```

## Example

`ConfigFactory` is a static factory class that can be used to create a standard `nconf` object. However, there are two parameters that can be passed to the `createConfig` function.

* `directory` - The directory that contains `.js` or `.json` configuration files to load.
* `overrides` - An optional path to a file that can override the properties merged from configuration directory.

```js
var ConfigFactory = require('config-factory');

var config = ConfigFactory.createConfig({
	directory: __dirname + '/etc/',
	overrides:  __dirname + '/etc/locals.js'
});

var setting = config.get('setting');
```

Configuration files can be either valid `.js` or `.json`. After loading, the normal `nconf` API can be applied.

## Code quality and tests

```sh
$ npm run lint
$ npm run test
```

## License

MIT
