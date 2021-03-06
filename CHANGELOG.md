# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][unreleased]

## [0.1.4] - 2015-08-20
### Fixed
- Fixed a problem where sepcifying overrides the ignore pattern would conflict.

## [0.1.3] - 2015-05-26
### Fixed
- Fixed problem with `nconf` where if you don't specify the memory store, it doesn't `set` synchronously.

## [0.1.2] - 2015-05-26
### Added
- Added `ignore` option to `ConfigFactory.createConfig` to allow you to read a directory and ignore files matching a regex.
- Added `patch` script (`npm run patch`) to make publishing easier.
- Added `CHANGELOG.md`

### Changed
- Made `overrides` path optional in `ConfigFactory.createConfig`
- `ConfigFactory.createConfig` returns a new instance of `Provider` each time, rather than using the `nconf` singleton.
