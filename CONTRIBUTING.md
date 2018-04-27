# Contributing

Thank you for your interest in contributing!

sass-affected is not simple to integrate into typical workflows. We are looking for help in bridging that gap.

## Integration ideas

Please reach out if you have begun work or are interested in working on any of the below. For anything else useful that doesn't fit this, consider adding it to the wiki.

* gulp
* webpack
* Any build tool that has a Sass compilation step

## Improvements to sass-affected library

Please create an issue with your idea first. This is so that we can discuss the issue without tying it to a specific solution. Fork, develop, and create a pull request referencing this issue.

## Developing

Before commit, various code checks are performed:

* Run tests with `jest`.
* Lint and format source with `eslint` and `prettier`.
* Perform type check on source with `flow`.
* Build library with `bili`.
* Add all changed files to staged before commit.

You are free and encouraged to perform these checks manually as you develop. We are not looking to change any of the style configs.
