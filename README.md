# sass-affected

Map Sass file changes to the root file(s) that are affected, helping create more efficient regression tests.

## Why?

One can use `sass-graph` as a CLI tool to find the ancestors of a Sass file. This will list every intermediary file as well as the root(s). `sass-affected` aims to show the root Sass file so that developers or QA teams can identify which templates are affected by changing any ol' Sass file in a project.

## Requirements

The CLI tool is built to support Node 6.x runtimes. The Node library is exposed in CommonJS format for Node 6.x and in ES2015 format if you need to bundle it for other runtimes.

## Usage

This tool only finds root Sass files. It is not wired up to version control, CI, or any sort of build process out of the box. You will have to integrate it into your teams processes to get any benefit.

### Use it as a CLI tool

```sh
sass-affected --dir src/scss --changed src/scss/helpers/_utils.scss
```

Let the tool diff against a branch:

```sh
sass-affected --dir src/scss --branch origin/master
```

### Use it as a Node library

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

## Contributing

sass-affected is meant to be used as a helpful library in a team's development and QA process. The most helpful contributions are separate modules, scripts, etc that allow development and QA teams to integrate the helpful regression messages without extra work. That said, if you have suggestions and improvements to this library, please feel welcome!

See our [contributing guide](/CONTRIBUTING.md) for details.
