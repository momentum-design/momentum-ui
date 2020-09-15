# Momentum UI Web Components

[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/LICENSE) [![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Cisco-Systems/Momentum-UI-Web-Component)

**`Momentum UI Web Components`** is a resuable, component based, flexible React library available as
npm module. It provides set of UI components and utilities based on [Momentum Design](https://momentum.design).

Checkout the [documentation](https://momentum.design) for documentation and live examples.

## Goals
* **Independent** — pick and use only the components you need.
<!-- * **Styled** — override styles of components by `className` and `style` properties. -->
* **Customizable** — properties allow many different config options to suit your app.
* **Performant** - high performance guaranteed with use of CSS3 Flexbox and non-bloated architecture.
* **Reliable** — each component is rigorously tested.

## Getting Started

Source of `@momentum-ui/web-component` is available [here](https://sqbu-github.cisco.com/Collaboration/momentum-ui-web-components).
To use momentum-ui-web-components in your application follow below steps:

### Step 2. Import Momentum UI Web Components in your app

Use ES6 modules to import Momentun UI Web Components into your app in your `index.html ` file:

```html
<script type="module" src="./node_modules/momentum-ui-web-components/lib/index.js"></script>
```

And in your component's  `html`:

```html
<div>
  <md-button>Click me!<md-button>
</div>
```

### Package manager

* [yarn](https://github.com/yarnpkg/yarn) - BSD-2-Clause

### Base framework

* [lit-element](https://github.com/Polymer/lit-element) - MIT

* [lit-html](https://github.com/Polymer/lit-html) - MIT

### Momentum Design System Look & Feel

* [@momentum-ui/core](https://github.com/momentum-design/momentum-ui-core) - MIT
* [@momentum-ui/icons](https://github.com/momentum-design/momentum-ui-icons) - MIT

### ES6 Minifier

* [babili](https://github.com/babel/babili) - MIT

### ES6 Lint

* [eslint](https://github.com/eslint/eslint) - MIT

### CSS/SCSS Lint

* [stylelint](https://github.com/stylelint/stylelint) - MIT

### CSS Utility Tool

* [normalize](https://github.com/necolas/normalize.css) - MIT

* [postcss](https://github.com/postcss/postcss) - MIT

### JsUnit Testing framework

* [karma](https://github.com/karma-runner/karma) - MIT

* [mocha](https://github.com/mochajs/mocha) - MIT

* [chai](https://github.com/chaijs/chai) - MIT


## Contribution

Want to contribute? Why not go through [Developer's Guide](./GETTING_STARTED.md) to understand more technical details about the project and contribution guidelines to be adhered.

## Changelog

<!-- The changelog can be found on the [Releases page](https://github.com/momentum-design/momentum-ui-react/releases). -->

## Known Issues

## Copyright

Copyright (c) 2019 Cisco Systems
