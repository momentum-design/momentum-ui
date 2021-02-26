# Momentum UI Core

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
![npm (scoped)](https://img.shields.io/npm/v/@momentum-ui/core.svg)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/core/LICENSE)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Momentum-Design/momentum-ui)

> @momentum-ui/core

Momentum UI Core is a UI framework for implementing Cisco Momentum Design into web apps and sites.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

Install and manage the Momentum UI Core using NPM. You may use `yarn` or `npm`. By default, yarn/npm installs packages to node_modules/.

`npm install @momentum-ui/core --save`

or

`yarn add @momentum-ui/core`

## Usage

### CSS

1. Copy the "@momentum-ui/core/fonts" directory to the "fonts" directory for your site.
2. Copy the "@momentum-ui/core/images" directory to the "images" directory for your site.
3. Copy the "@momentum-ui/core/css/momentum-ui.min.css" to your styles/css directory.
4. In the `<head>` of your HTML reference the location of your momentum-ui.min.css.

  `<link rel="stylesheet" href="path/to/momentum-ui/css/momentum-ui.min.css">`

### Scss

1. Copy the "@momentum-ui/icons/fonts" directory to the "fonts" directory for your site.
2. Add an "$brand-font-folder, $icon-font-path, and $images-path" variables to your app's variables.scss file.

```
$brand-font-folder: 'path/to/fonts/directory';
$icon-font-path: 'path/to/fonts/directory';
$images-path: 'path/to/images/directory';
```

3. Import "@momentum-ui/core/scss/momentum-ui.scss" into your main entry Scss file AFTER the variables.

`@import '~@momentum-ui/core/scss/momentum-ui';`

4. Compile your Scss using your static compiler or bundler (Webpack, Grunt, Gulp, etc.)

## Contribute

See [the contributing file](CONTRIBUTING.md)!

PRs accepted.

## License

[© 2014-2020 Cisco and/or its affiliates. All Rights Reserved.](../LICENSE)
