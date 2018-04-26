# Contribution Guidelines

## Commit messages

Each commit message consists of a header and a description. The header has a special format that includes a type, a scope and a subject:

```html
    <type>(<scope>): <subject>
    <BLANK LINE>
    <description>
```

The header is mandatory and the scope of the header is optional. Should contain a closing reference to an issue if any.
Any line of the commit message cannot be longer 120 characters! This allows the message to be easier to read on GitHub as well as in various git tools.

_type_:

* feat
* fix
* chore
* doc
* test

_scope_:

* feature/component name

### Sample Commit message

![sample_commit_message]\(./doc_img/commit_message.png)\

## Coding Guidelines

* Prefer ES6 classes over prototypes.

```js
class Abc {
  publicmethod() {}
  render() {}
}
```

* Prefer arrow functions =>, over the function keyword except when defining classes or methods.
* Use PascalCase for classes and components, lowerCamelCase for variables and functions, SCREAMING_SNAKE_CASE for constants, \_singleLeadingUnderscore for private variables and functions.
* Prefer template strings over string concatenation.

```js
let name = 'World!';
let concatenatedvalue_correct = \`Hello ${name} everyone!\`; // ✔
let concatenatedvalue_wrong = 'Hello ' + name + ' everyone'; // ✕
```

* Prefer promises over callbacks.
* Prefer array functions like map and forEach over for loops.
* Use const for declaring variables that will never be re-assigned, and let otherwise.
* Avoid var to declare variables.
* Use lowercase names for folder names and PascalCase for component folder names.
* Every component has the following structure:

```html
└── src
    └── components
        ├── MyComponent
        |   ├── __snapshots__
        |   |   ├── index.spec.js.snap
        |   |   └── mycomponent.spec.jsx
        |   ├── index.spec.js
        |   ├── index.js
        |   ├── MyComponent.css (should typically come from Collab-UI)
        |   └── Readme.md
```

Please follow the coding style of the current code base. Collab UI React uses [eslint](http://eslint.org/) for ES6/JS and [stylelint](https://stylelint.io/) for scss/css, so if possible, enable linting in your editor to get realtime feedback. The linting rules can be run manually as below

```js
npm run lint
```

## Development Stack

### ES6

We use [eslint:recommended](https://github.com/eslint/eslint) with [jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) for accessbility with following customization as listed below:

```js
{
    "quotes": 0,
    "no-console": 1,
    "no-debugger": 1,
    "no-var": 1,
    "semi": [1, "always"],
    "no-trailing-spaces": 0,
    "eol-last": 0,
    "no-underscore-dangle": 0,
    "no-alert": 0,
    "no-lone-blocks": 0,
    "jsx-quotes": [0, "prefer-single"],
    "react/display-name": [
      1,
      {
        "ignoreTranspilerName": false
      }
    ],
    "react/forbid-prop-types": [
      1,
      {
        "forbid": ["any"]
      }
    ],
    "react/jsx-boolean-value": 0,
    "react/jsx-closing-bracket-location": 0,
    "react/jsx-curly-spacing": 1,
    "react/jsx-indent-props": 0,
    "react/jsx-key": 1,
    "react/jsx-max-props-per-line": 0,
    "react/jsx-no-bind": 0,
    "react/jsx-no-duplicate-props": 1,
    "react/jsx-no-literals": 0,
    "react/jsx-no-undef": 1,
    "react/jsx-pascal-case": 1,
    "react/jsx-sort-prop-types": 0,
    "react/jsx-sort-props": 0,
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/jsx-wrap-multilines": 1,
    "react/no-danger": 1,
    "react/no-did-mount-set-state": 1,
    "react/no-did-update-set-state": 1,
    "react/no-direct-mutation-state": 1,
    "react/no-multi-comp": 1,
    "react/no-set-state": 0,
    "react/no-unknown-property": 1,
    "react/prefer-es6-class": 1,
    "react/prop-types": 1,
    "react/react-in-jsx-scope": 1,
    "import/extensions": 1,
    "react/self-closing-comp": 1,
    "react/sort-comp": 1
  }
```
### Babel

* #### What ?

  Babel.js is a transpiler - it takes your code written in a ECMAScript 2015 standard and produces the code in the older standard that browsers can run. It also allows you to enable experimental ECMAScript 2016 (a.k.a. ECMAScript 7 or ES7) features and has a built-in JSX transpiler. It can take JSX syntax that React uses and produce the JavaScript code out of it.

* #### Why ?

  Of all the ES6 transpilers, Babel has the greatest level of [compatibility with the ES6](http://kangax.github.io/compat-table/es6/) spec, even exceeding the much longer established [Traceur](https://github.com/google/traceur-compiler) by Google.

* #### Where?

  [https://babeljs.io/](https://babeljs.io/)

  [http://codemix.com/blog/why-babel-matters](http://codemix.com/blog/why-babel-matters)

### Testing

* #### What ?

    All UI components of `collab-ui-react` are unit-tested using two approaches:

    1. [Jest](http://facebook.github.io/jest/) (Typically for snapshot testing)
        * Jest is a JavaScript test runner maintained and recommended by Facebook. Jest is a batteries included unit testing framework and few of its benefits includes `being fast`, `feature rich`, and `integrates perfectly with Babel`. Jest provide `Painless JavaScript Testing`.
        * Snapshot tests are a very useful tool whenever you want to make sure your UI does not change unexpectedly.
        * A typical snapshot test case for a web app renders a UI component, takes a screenshot, then compares it to a reference image stored alongside the test. The test will fail if the two images do not match: either the change is unexpected, or the screenshot needs to be updated to the new version of the UI component.
        * Snapshot testing covers most cases of Unit testing.
    2. [Enzyme](http://airbnb.io/enzyme/) (Typically for Functional/DOM testing)
        * Enzyme's API is meant to be intuitive and flexible by mimicking jQuery's API for DOM manipulation and traversal.
        * Enzyme works well for functionality testing with shallow rendering of components.
        * It features jQuery like API for quick DOM traversal.
        * Use it when a runtime feature is to be tested that cannot be covered using snapshot testing, for example: Click behavior on a component.
        * All properties used in components are invariably tested using inbuilt `React PropTypes`.

* #### Why ?

    * **👩🏻‍💻 Easy Setup:** Jest is a complete and easy to set up JavaScript testing solution. In fact, Jest works out of the box for any React project.

    * 🏃🏽**🏽 Instant Feedback:** Failed tests run first. Fast interactive mode can switch between running all tests or only test files related to changed files.

    * **📸 Snapshot Testing:** Jest can capture snapshots of React trees or other serializable values to simplify UI testing.

    * **Performance** - Jest run tests in parallel processes thus minimizing test runtime.

    * **Mocking** - Jest allows you to mock objects in your test files. It supports function mocking, manual mocking, and timer mocking. You can mock specific objects or turn on automatic mocking with automock which will mock every component/object that the component/object test depends on.

    * **Ease of use** - Helpful fail messages and simple configuration. Awesome interactive watch mode that reruns only tests that are relevant to your changes.

    * **Code coverage support** - This is provided with Jest with no additional packages or configuration.

    * **Test isolation and sandboxing** - With Jest, no two tests will ever conflict with each other, nor will there ever be a global or module local state that is going to cause trouble. Sandboxed test files and automatic global state resets for every test.

    * **Integrates with other testing libraries** - Jest works well with other testing libraries (e.g. Enzyme, Chai).

    * **Active development**.

* #### Where?

    [https://facebook.github.io/jest/](https://facebook.github.io/jest/)

    [https://semaphoreci.com/community/tutorials/snapshot-testing-react-components-with-jest](https://semaphoreci.com/community/tutorials/snapshot-testing-react-components-with-jest)

    [https://dzone.com/articles/testing-react-applications-with-jest](https://dzone.com/articles/testing-react-applications-with-jest)

    [https://medium.com/@dschmidt1992/jest-snapshot-testing-3ef9fa1222bb](https://medium.com/@dschmidt1992/jest-snapshot-testing-3ef9fa1222bb)

### PostCSS

* #### What ?

  PostCSS is a Node.js module that parses CSS into an abstract syntax tree (AST); passes that AST through any number of “plugin” functions; and then converts that AST back into a string, which you can output to a file. Each function the AST passes through may or may not transform it; sourcemaps will be generated to keep track of any changes.

* #### Why ?

  * Its modular architecture means we can pick and choose what we use; this allows us to keep the size of the library very small and responsive

  * Existing processors tend to fall into one of two camps—pre- or post-processing—which is a limiting factor when choosing which to use. PostCSS allows us to perform both operations within the same process, meaning we get the benefits of both worlds of processing!

  * There are no dependencies for compiling, PostCSS is written entirely in JavaScript, so no need for Ruby, or libraries such as libsass, in order to compile code.

  * There is no need to learn any new languages; every developer will be familiar with JavaScript, and use it in their development process.

  * Its relatively low barrier of entry means we can create any plugins we need very easily, or potentially modify existing ones to better suit our needs.

  * PostCSS is quick—in a test using the postcss-benchmark plugin (available from https://github.com/postcss/benchmark), which contained parsed code, nested rules, mixins, variables, and math, PostCSS came out a clear winner:


      * **PostCSS:    36 ms**

      * Rework:     77 ms   (2.1 times slower)

      * Libsass:    136 ms  (3.8 times slower)

      * Less:       160 ms  (4.4 times slower)

      * Stylus:     167 ms  (4.6 times slower)

      * Stylecow:   208 ms  (5.7 times slower)

      * Ruby Sass:  1084 ms (30.1 times slower)

* #### Where ?

  [http://postcss.org/](http://postcss.org/)

  [https://github.com/postcss/postcss](https://github.com/postcss/postcss)

  [http://davidtheclark.com/its-time-for-everyone-to-learn-about-postcss/](http://davidtheclark.com/its-time-for-everyone-to-learn-about-postcss/)

  [http://www.meetpostcss.com/](http://www.meetpostcss.com/)

  [https://github.com/jjaderg/awesome-postcss](https://github.com/jjaderg/awesome-postcss)

* #### Plugins we use

  * Autoprefixer - [https://github.com/postcss/autoprefixer](https://github.com/postcss/autoprefixer)

## Design Principles

### Components

  * `Collab UI React` follows **components and their compositions** based architecture with focus on simplicity, flexibility and performance.

  * Each UI component along with source, JsUnits and documentation are placed at individual folder inside src/components.

  * Only statefull components are implemented as subclass of `React.Component`. Others are simple stateless functions or PureComponents.

  * Source is written is ES6 and processed through babel to generate minified ES6 modules (ready to `import`).

### CSS

  All assets (like fonts, icons, images, etc ) related to Symphony based styleguides are directly reused from `collab-ui`.

### Tasks

  All tasks are made available as `npm` or `yarn` scripts without any bloat that comes with usual task runners (like `grunt`, `gulp`, etc).

### Documentation

  * The document site related to component usage/example is documented using components within the component files themselves and output in the docs folder.

  * Any change/creation of additional components should include modified example file.


```js
/**
 * @category communication
 * @component test
 * @variations collab-ui-react
 */
import React from 'react';
import PropTypes from 'prop-types';


export default class test extend React.Component {
  return (<div>test</div>)
};


/**
* @name test
* @description default test
* @category communication
* @component test
* @section default
*
* @html
import { Test } from 'components';

export default class docs extends React.PureComponent {

  render() {
    return (
      <Test />
    );
  }
}
**/
```


### Utils

  * There are few shared utility that are kept aside as `helpers` under 'src' but outside `components` folder.

## License

By contributing your code to the `collab-ui/collab-ui-react` GitHub repository, you agree to license your contribution under the MIT license.
