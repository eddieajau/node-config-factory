# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][unreleased]
### Added
- Added `ignore` option to `ConfigFactory.createConfig` to allow you to read a directory and ignore files matching a regex.
- Added `patch` script (`npm run patch`) to make publishing easier.
- Added `CHANGELOG.md`

### Changed
- Made `overrides` path optional in `ConfigFactory.createConfig`
- `ConfigFactory.createConfig` returns a new instance of `Provider` each time, rather than using the `nconf` singleton.
