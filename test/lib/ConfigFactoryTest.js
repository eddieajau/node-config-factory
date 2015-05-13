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
var fs = require('fs');

var ConfigFactory = require('app-root-path').require('/lib/ConfigFactory');

function assertConfigurationLoaded(config) {
	assert.equal(config.get('video:brightness'), '100%', 'should load a JSON file');
	assert.equal(config.get('video:resolution'), '720p', 'locals.js should override the video resolution');
	assert.equal(config.get('audio:volume'), '50%', 'should load a JavaScript file');
	assert.equal(config.get('audio:tone'), '3', 'locals.js should override the audio tone');
	assert.equal(config.get('audio:mute'), true, 'locals.js can introduce new configuration');
}

suite('ConfigFactory', function () {

	test('should create an nconf object, allowing locals.js to override values', function () {

		var config = ConfigFactory.createConfig({
			directory: __dirname + '/../_fixtures',
			overrides:  path.normalize(__dirname + '/../_fixtures/locals.js')
		});

		assertConfigurationLoaded(config);

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
