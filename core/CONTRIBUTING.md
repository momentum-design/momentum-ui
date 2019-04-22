
# Contributing

##### We'd love for you to contribute to our source code and to make Momentum UI even better than it is today! Here are the guidelines we'd like you to follow:

## Table of Contents

- [Questions, Issues or Ideas](../CONTRIBUTING.md#question)
  - [Issues](../CONTRIBUTING.md#issue)
  - [Features](../CONTRIBUTING.md#feature)
- [Requirements](../CONTRIBUTING.md#requirements)
- [Development Environment](../CONTRIBUTING.md#environment)
- [Adding a new component](#component)
- [Running the project locally](#running)
- [Testing](#testing)
- [Code Guidelines](#rules)
- [Commit Guidelines](../CONTRIBUTING.md#commit)
- [Submitting a Code Review](../CONTRIBUTING.md#code-review)

## <a name="submit"></a> Submission Guidelines

## <a name="running"></a> Running the project locally

* Run the start script which will build and watch the library, then serve it at localhost:4200
  * `yarn start:core` from the root (momentum-ui) directory
  * `yarn start` from the core (momentum-ui/core) directory
* You can access the playground `localhost:4200/playground`

## <a name="component"></a> Adding a new component
1. cd into the core directory: `cd core/`
2. For a new component, create a directory in the "scss/components" directory: `scss/components/<componentName>`
3. Add a Scss file for your component: `<componentName>.scss`
4. If you need mixins or variables, add those files to the `<componentName>` directory:
    - `<componentName>/mixins.scss`
    - `<componentName>/variables.scss`
5. Add a "tests" directory and file for the snapshot tests: `/tests/<componentName>.cy.js`
6. Add an "examples" directory and file for the documentation: `/examples/<componentName>-default.html`

### Your component directory should look like this:
``` bash
└── scss
    └── components
        └── sample                        # component directory
            ├── sample.scss               # component file
            ├── mixins.scss               # mixins file
            ├── variables.scss            # variables file
            ├── examples                  # examples directory
            |   └── sample-default.html   # example file
            └── tests                     # tests directory
                └── sample.cy.js          # component unit test
```

## <a name="testing"></a> Testing
* In the `<componentName>/tests/` directory, ensure that you add test to take the snapshots for visual regression testing
* Run the test and ensure that all tests are passing by running:
  * `yarn test` from the core (momentum-ui/core) directory
  * `yarn test:core` from the root (momentum-ui) directory

## <a name="rules"></a> Coding Guidelines

### HTML

[Adhere to the Code Guide](http://codeguide.co/#html)

### CSS

[Adhere to the Code Guide](http://codeguide.co/#css)

## License

By contributing your code to the `@momentum-ui/core` GitHub repository, you agree to license your contribution under the MIT license.
