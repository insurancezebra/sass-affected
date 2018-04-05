# sass-affected

Map Sass file changes to the root file(s) that are affected, helping create more efficient regression tests.

## Why?

One can use `sass-graph` as a CLI tool to find the ancestors of a Sass file. This will list every intermediary file as well as the root(s). `sass-affected` aims to show the root Sass file so that developers or QA teams can identify which templates are affected by changing any ol' Sass file in a project.

## Requirements

The CLI tool is built to support Node 6.x runtimes. The Node library is exposed in CommonJS format for Node 6.x and in ES2015 format if you need to bundle it for other runtimes.

## Usage

Use it as a CLI tool:

```sh
sass-affected --dir src/scss --changed src/scss/helpers/_utils.scss
```

Let the tool diff against a branch:

```sh
sass-affected --dir src/scss --branch master
```

Use it as a Node library:

```js
import sassAffected from "sass-affected";

// This returns a Promise
sassAffected("mocks", ["mocks/rootA.scss"]).then(obj => {
  // The output will be an array of roots with their corresponding message:
  // [{ file, message }]
  console.log(obj);
});
```

Add the following magic comment to the top of your root Sass files to customize the regression check message:

```scss
// sass-affected /homepage.html should be checked for regressions!
```

## Developing

Before commit, various code checks are performed:

* Run tests with `jest`.
* Lint and format source with `eslint` and `prettier`.
* Perform type check on source with `flow`.
* Build library with `bili`.
* Add all changed files to staged before commit.

You are free and encouraged to perform these checks manually as you develop.

## Releasing

* Before merging into master, bump up the version according to [semver](https://semver.org/) rules and make a release in Github.
* Consuming applications should reference that release in their `package.json` like this: `"sass-affected": "ssh://github.com/insurancezebra/sass-affected.git#1.2.3`.
