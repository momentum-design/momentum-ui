# momentum-ui-icons

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
![npm (scoped)](https://img.shields.io/npm/v/@momentum-ui/icons.svg)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/icons/LICENSE)

> Momentum UI Icons

Momentum UI Icons is a full suite of the pictographic font and svg icons.

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

Momentum UI Icons is a full suite of the pictographic icons for easy scalable vector graphics on websites and web applications, created and maintained by the Spark UI Design Language team. It contains the Scss, CSS, fonts and SVG files needed for implenting the icons indepented of any other framework. It is also consumed and published as part of the Momentum UI Toolkit.

## Install

Install and manage the Spark UI Toolkit's icons using NPM. You may use `yarn` or `npm`. By default, yarn/npm installs packages to node_modules/.

`yarn add @momentum-ui/icons`

or

`npm install @momentum-ui/icons --save`

## Usage


### CSS

1. Copy the "@momentum-ui/icons/fonts" directory to the "fonts" directory for your site.
2. Copy the "@momentum-ui/icons/css/momentum-ui-icons.min.css" to your styles/css directory.
3. In the `<head>` of your HTML reference the location of your momentum-ui-icons.min.css.

  `<link rel="stylesheet" href="path/to/momentum-ui-icons/css/momentum-ui-icons.min.css">`


### Scss
1. Copy the "@momentum-ui/icons/fonts" directory to the "fonts" directory for your site.
2. Add an "$icon-font-path" variable to your variables.scss file.

`$icon-font-path: 'path/to/fonts/directory';`

3. Import "@momentum-ui/icons/scss/momentum-ui-icons.scss" into your main entry Scss file AFTER the variables.

`@import '@momentum-ui/icons/scss/momentum-ui-icons.scss';`

4. Compile your Scss using your static compiler or bundler


## CSS API

### Basic Icons

You can place Momentum UI Icons just about anywhere using the CSS Prefix `icon-` and the icon's name. Momentum UI Icons is designed to be used with inline elements (we like the `<i>` tag for brevity, but using a `<span>` is more semantically correct).

`<i class="icon icon-camera_16"></i>`

### Icon Sizes

All of the Momentum UI Icons are suffixed with their size. i.e. `icon-camera_16` The CSS will automatically size the icons according to this size.

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

[© 2014-2020 Cisco and/or its affiliates. All Rights Reserved.](../LICENSE)
