## Getting Started

#### An overview of the Momentum UI Core, how to download and use, examples, and more.

## Install with NPM or Yarn

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


### Node-Sass

When using node-sass directly to compile your scss, you will need to add [node-sass-tilde-importer](https://www.npmjs.com/package/node-sass-tilde-importer) to resolve the "~" `@import` refernces to @colalb-ui/icons. See https://www.npmjs.com/package/node-sass-tilde-importer for usage details.
