# sass-affected

Map SASS file changes to the root file(s) that are affected, helping create more efficient regression tests.

## Why?

One can use `sass-graph` as a CLI tool to find the ancestors of a SASS file. This will list every intermediary file as well as the root(s). `sass-affected` aims to show the root SASS file so that developers or QA teams can identify which templates are affected by changing any ol' SASS file in a project.

## Requirements

This library is exposed in CommonJS format for Node 6.x and in ES2015 format if you need to bundle it for other runtimes.

## Usage

Use it as a CLI tool:

```sh
sass-affected --dir src/scss --changed src/scss/helpers/_utils.scss src/scss/components/_header.scss
```

Add the following magic comment near the top of your root SASS files to customize the regression check message:

```scss
// sass-affected /homepage.html should be checked for regressions!
```

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
