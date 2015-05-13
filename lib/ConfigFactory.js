/**
 * ConfigFactory
 *
 * Loads a directory of JavaScript or JSON format configuration files.
 */

"use strict";

var fs = require('fs');
var path = require('path');
var nconf = require('nconf');

/**
 * Find files in a directory (excluding "locals.js" which is used for overrides).
 *
 * @param {string} directory - The directory path to scan.
 * @param {string} overrides - The path to the override file.
 * @returns {array.<string>} - An array of full file paths.
 * @private
 */
function findFiles(directory, overrides)
{
	return fs.readdirSync(directory)
		.filter(function (file) {
			return path.join(directory, file) != path.normalize(overrides);
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
 * @param {object} options
 * @param {array}  options.directory - The directory that contains js configuration files to load.
 * @param {string} options.overrides - The path to a file containing overrides.
 * @returns {nconf} - An nconf configuration object.
 */
function createConfig(options) {
	var files = findFiles(options.directory, options.overrides);

	if (fs.existsSync(options.overrides)) {
		nconf.overrides(require(options.overrides));
	}

	files.forEach(function (file) {
		nconf.use(path.basename(file), {
			type: 'literal',
			store: require(file)
		});
	});

	return nconf;
}

module.exports = {
	createConfig: createConfig
};
