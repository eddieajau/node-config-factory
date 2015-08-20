/**
 * ConfigFactory tests.
 *
 * Remember to observe the 4 A's of testing and try to limit tests to just four calls:
 * - Arrange    - set up the system state
 * - Act        - do the thing we are testing
 * - Assert     - inspect the resulting state
 * - Annihilate - tear down
 */

var assert = require('assert');
var path = require('path');

var ConfigFactory = require('app-root-path').require('/lib/ConfigFactory');

function assertConfigurationLoaded(config) {
	var audio = config.get('audio');

	assert.equal(config.get('video:brightness'), '100%', 'should load a JSON file');
	assert.equal(config.get('video:resolution'), '720p', 'locals.js should override the video resolution');
	assert.equal(config.get('audio:volume'), '50%', 'should load a JavaScript file');
	assert.equal(audio.tone, '3', 'locals.js should override the audio tone');
	assert.equal(audio.mute, true, 'locals.js can introduce new configuration');
	assert.equal(audio.input.usb, 'yes', 'locals.js should override nested value');
}

suite('ConfigFactory', function () {

	test('should create an nconf object, allowing locals.js to override values', function () {

		var config = ConfigFactory.createConfig({
			directory: __dirname + '/../_fixtures',
			overrides:  path.normalize(__dirname + '/../_fixtures/locals.js'),
			ignore: /foo/
		});

		assertConfigurationLoaded(config);

		config = null;
	});

	test('should load a directory ingoring a mask', function () {

		var config = ConfigFactory.createConfig({
			directory: __dirname + '/../_fixtures',
			ignore: /foo|locals/
		});

		assert.equal(config.get('audio:tone'), '0', 'Should ignore the override in locals.js');

		config = null;
	});

	test('should ignore a file in a directory', function () {

		var config = ConfigFactory.createConfig({
			directory: __dirname + '/../_fixtures',
			ignore: /foo/
		});

		assert.equal(config.get('audio:mute'), true, 'Should load locals.js');

		config = null;
	});

	test('should be able to set a config element', function () {

		var config = ConfigFactory.createConfig({
			directory: __dirname + '/../_fixtures',
			ignore: /foo/
		});

		config.set('audio:volume', '110%');

		assert.equal(config.get('audio:volume'), '110%', 'Should set a value');

		config = null;
	});

	test('should throw an error if the configuration directory does not exist', function () {
		assert.throws(function () {
			ConfigFactory.createConfig({
				directory: __dirname + '/does-not-exist'
			});
		});
	});

});
