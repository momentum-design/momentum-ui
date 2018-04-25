# Collab UI Core

[![license](https://img.shields.io/github/license/ciscospark/react-ciscospark.svg)](https://github.com/collab-ui/collab-ui-icons/blob/master/LICENSE)

> @collab-ui/core

Collab UI Core is a UI framework for implementing Cisco Collaboration Design into web apps and sites.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

Install and manage the Collab UI Core using NPM. You may use `yarn` or `npm`. By default, yarn/npm installs packages to node_modules/.

`npm install @collab-ui/core --save`

or

`yarn add @collab-ui/core`

## Usage

### CSS

1. Copy the "@collab-ui/core/fonts" directory to the "fonts" directory for your site.
2. Copy the "@collab-ui/core/images" directory to the "images" directory for your site.
3. Copy the "@collab-ui/core/css/collab-ui.min.css" to your styles/css directory.
4. In the `<head>` of your HTML reference the location of your collab-ui.min.css.

  `<link rel="stylesheet" href="path/to/collab-ui/css/collab-ui.min.css">`

### Scss

1. Copy the "@collab-ui/icons/fonts" directory to the "fonts" directory for your site.
2. Add an "$brand-font-folder, $icon-font-path, and $images-path" variables to your app's variables.scss file.

```
$brand-font-folder: 'path/to/fonts/directory';
$icon-font-path: 'path/to/fonts/directory';
$images-path: 'path/to/images/directory';
```

3. Import "@collab-ui/core/scss/collab-ui.scss" into your main entry Scss file AFTER the variables.

`@import '~@collab-ui/core/scss/collab-ui';`

4. Compile your Scss using your static compiler or bundler (Webpack, Grunt, Gulp, etc.)

## Contribute

See [the contributing file](CONTRIBUTING.md)!

PRs accepted.

## License

[© 2014-2018 Cisco and/or its affiliates. All Rights Reserved.](../LICENSE)
