# collab-ui-icons

[![CircleCI](https://img.shields.io/circleci/project/github/collab-ui/collab-ui/master.svg)](https://circleci.com/gh/collab-ui/collab-ui/)
![npm (scoped)](https://img.shields.io/npm/v/@collab-ui/icons.svg)
[![license](https://img.shields.io/github/license/collab-ui/collab-ui.svg?color=blueviolet)](https://github.com/collab-ui/collab-ui/blob/master/icons/LICENSE)

> Collab UI Icons

Collab UI Icons is a full suite of the pictographic font and svg icons.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
    - [CSS](#css)
    - [Scss](#scss)
- [API (CSS)](#api)
- [Contribute](#contribute)
- [License](#license)


## Background

Collab UI Icons is a full suite of the pictographic icons for easy scalable vector graphics on websites and web applications, created and maintained by the Spark UI Design Language team. It contains the Scss, CSS, fonts and SVG files needed for implenting the icons indepented of any other framework. It is also consumed and published as part of the Collab UI Toolkit.

## Install

Install and manage the Spark UI Toolkit's icons using NPM. You may use `yarn` or `npm`. By default, yarn/npm installs packages to node_modules/.

`yarn add @collab-ui/icons`

or

`npm install @collab-ui/icons --save`

## Usage


### CSS

1. Copy the "@collab-ui/icons/fonts" directory to the "fonts" directory for your site.
2. Copy the "@collab-ui/icons/css/collab-ui-icons.min.css" to your styles/css directory.
3. In the `<head>` of your HTML reference the location of your collab-ui-icons.min.css.

  `<link rel="stylesheet" href="path/to/collab-ui-icons/css/collab-ui-icons.min.css">`


### Scss
1. Copy the "@collab-ui/icons/fonts" directory to the "fonts" directory for your site.
2. Add an "$icon-font-path" variable to your variables.scss file.

`$icon-font-path: 'path/to/fonts/directory';`

3. Import "@collab-ui/icons/scss/collab-ui-icons.scss" into your main entry Scss file AFTER the variables.

`@import '@collab-ui/icons/scss/collab-ui-icons.scss';`

4. Compile your Scss using your static compiler or bundler


## CSS API

### Basic Icons

You can place Collab UI Icons just about anywhere using the CSS Prefix `icon-` and the icon's name. Collab UI Icons is designed to be used with inline elements (we like the `<i>` tag for brevity, but using a `<span>` is more semantically correct).

`<i class="icon icon-camera_16"></i>`

### Icon Sizes

All of the Collab UI Icons are suffixed with their size. i.e. `icon-camera_16` The CSS will automatically size the icons according to this size.

### Fixed Width Icons

Use `icon-fw` to set icons at a fixed width. Great to use when different icon widths throw off alignment. Especially useful in things like nav lists & list groups.

### List Icons

Use `icon-ul` and `icon-li` to easily replace default bullets in unordered lists.

### Animated Icons

Use the `icon-spin` class to get any icon to rotate, and use `icon-pulse` to have it rotate with 8 steps.

### Rotated & Flipped

To arbitrarily rotate and flip icons, use the `icon-rotate-*` and `icon-flip-*` classes.

## Contribute

Icon contributions are currently only accepted from the Spark UI Design team.

## License

[© 2014-2019 Cisco and/or its affiliates. All Rights Reserved.](../LICENSE)
