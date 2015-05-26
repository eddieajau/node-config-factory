/**
 * ConfigFactory
 *
 * Loads a directory of JavaScript or JSON format configuration files.
 */

"use strict";

var fs = require('fs');
var path = require('path');
var Provider = require('nconf').Provider;

/**
 * Find files in a directory (excluding "locals.js" which is used for overrides).
 *
 * @param {string} directory   - The directory path to scan.
 * @param {string} [overrides] - The path to the override file.
 * @param {string} [ignore]    - A regex to apply to the file names to ignore.
 * @returns {array.<string>} - An array of full file paths.
 * @private
 */
function findFiles(directory, overrides, ignore)
{
	return fs.readdirSync(directory)
		.filter(function (file) {
			if (ignore) {
				return !file.match(ignore);
			}
			else if (overrides) {
				return path.join(directory, file) != path.normalize(overrides);
			}

			return true;
		})
		.map(function (file) {
			return path.join(directory, file);
		});
}

/**
 * Create a configuration object.
 *
 * Loads all the files in the configuration directory.
 * If `locals.js` exists, this overrides all other configuration settings.
 *
 * @param {object} options             - Configuration options.
 * @param {array}  options.directory   - The directory that contains js configuration files to load.
 * @param {string} [options.overrides] - The path to a file containing overrides.
 * @param {object} [options.ignore]    - A regex to apply to the file names to ignore.
 * @returns {nconf} - An nconf configuration object.
 */
function createConfig(options) {
	var config = new Provider;
	var files = findFiles(options.directory, options.overrides, options.ignore);

	config.use('memory');

	if (fs.existsSync(options.overrides)) {
		config.overrides(require(options.overrides));
	}

	files.forEach(function (file) {
		config.use(path.basename(file), {
			type: 'literal',
			store: require(file)
		});
	});

	return config;
}

module.exports = {
	createConfig: createConfig
};
