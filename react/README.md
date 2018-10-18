# Collab UI React
**`Collab UI React`** is a resuable, component based, flexible React library available as
npm module. It provides set of UI components and utilities based on the Symphony UX design and patterns.

The git repo can be cloned from [collab-ui-react](https://github.com/collab-ui/collab-ui-react) at [https://github.com/collab-ui/collab-ui-react](https://github.com/collab-ui/collab-ui-react).

Checkout the [documentation](http://collab-ui-react.cisco.com/) for documentation and live examples.

## Goals
* **Independent** — pick and use only the components you need.
* **Styled** — override styles of components by `className` and `style` properties.
* **Customizable** — properties allow many different config options to suit your app.
* **Performant** - high performance guaranteed with use of CSS3 Flexbox and non-bloated architecture.
* **Reliable** — each component is rigorously tested.

**Collab UI React** is a UI framework for ReactJs applications. It provides set of UI components and utilities based on the Symphony UX design and patterns.

## Getting Started

Source of `@collab-ui/react` is available [here](https://github.com/collab-ui/collab-ui-react).
To use collab-ui-react in your application follow below steps:

### Step 1 - Install and add @collab-ui/react to your npm package dependencies

#### Using npm

```js
npm i -S @collab-ui/react
```

#### Using yarn

```js
yarn install -S @collab-ui/react
```

### Step 2. Import Collab UI React components in your app

Use ES6 import statement to import the component that you want to use:

```jsx
import { Button } from '@collab-ui/react';
// or
import Button from from '@collab-ui/react/button';
...
...

<div className="container">
  <Button name="primary" size="large">Welcome to Collab UI React !</Button>
</div>
```

## Tools & Frameworks

### Package manager

* [yarn](https://github.com/yarnpkg/yarn) - BSD-2-Clause

### Base framework

* [react](https://github.com/facebook/react) - MIT

* [react-dom](https://github.com/facebook/react) - MIT

### Collaboration Design System Look & Feel

* [@collab-ui/core](https://github.com/collab-ui/collab-ui-core) - MIT
* [@collab-ui/icons](https://github.com/collab-ui/collab-ui-icons) - MIT

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

* [jest](https://github.com/facebook/jest) - BSD-3-Clause

* [enzyme](https://github.com/airbnb/enzyme) - MIT


## Contribution

Want to contribute? Why not go through [Developer's Guide](./GETTING_STARTED.md) to understand more technical details about the project and contribution guidelines to be adhered.

## Changelog

The changelog can be found on the [Releases page](https://github.com/collab-ui/collab-ui-react/releases).

## Frequently Asked Questions

FAQ can be found [here](./docs/Faq.md)

## Copyright

Copyright (c) 2017 Cisco Systems
