# sass-affected

Map SASS file changes to the root file(s) that are affected, helping create more efficient regression tests.

## Usage

TBD

## Developing

* Run tests with `npm test`.
* Before commit, various code checks are performed.
  * Lint source with `eslint`.
  * Perform type check on source with `flow`.
  * Run tests with `jest`.
  * Build library with `bili`.
  * Format .js, .json, and .md files with `prettier`.
  * Add all changed files to staged before commit.

## Releasing

* Before merging into master, bump up the version according to [semver](https://semver.org/) rules and make a release in Github.
* Consuming applications should reference that release in their `package.json` like this: `"sass-affected": "ssh://github.com/insurancezebra/sass-affected.git#1.2.3`.
