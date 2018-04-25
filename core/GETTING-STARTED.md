## Getting Started

#### An overview of the Collab UI Core, how to download and use, examples, and more.

## Install with NPM or Yarn

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
