# sass-affected
Map SASS file changes to the root file(s) that are affected, helping create more efficient regression tests.

## Usage
TBD

## Developing
* Run tests with `npm test`.
* Various checks will be run before commit.

## Releasing
* Before merging into master, bump up the version according to [semver](https://semver.org/) rules and make a release in Github.
* Consuming applications should reference that release in their `package.json` like this: `"sass-affected": "ssh://github.com/insurancezebra/sass-affected.git#1.2.3`.
