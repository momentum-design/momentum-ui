# Contributing

##### We'd love for you to contribute to our source code and to make Momentum UI Chart even better than it is today! Below are the guidelines to follow.

## Table of Contents

- [Running the project locally](#running)
- [Build the project locally](#building)
- [Adding a new component](#component)
- [Usage](#Usage)
- [Testing](#testing)
- [Code Guidelines](#rules)
- [Commit Guidelines](../CONTRIBUTING.md#commit)
- [Submitting a Code Review](../CONTRIBUTING.md#code-review)

## <a name="running"></a> Running the project locally

* Run the following script which will build and watch the library, then serve it at localhost:6400
  * `yarn start` from the chart (momentum-ui/chart) directory

## <a name="building"></a> Build Library
* Run the following script to build bundles, es, lib version
  * `yarn build` from the chart (momentum-ui/chart) directory

## <a name="component"></a> Adding a new component
1.  cd into the chart directory: `cd chart`
2.  Use yarn scripts to create yourComponent. Replace `<component-name>` with the lower camel case name of the new component.
    * Create Component: `yarn g <component-name>`
3.  The script will update `src/lib/index.js` automatically.
4.  Update your component in `src/lib/<component-name:lower>/index.js`
5.  Update your unit test in `src/lib/<component-name:lower>/test/index.js`
6.  Update your example test in `src/lib/<component-name:lower>/example/index.js`
7.  Update `src/app/index.js` to play your example in plaground.

### Your components directory should look like this:
``` bash
└── src
  └── app                                       # test website directory
    ├── index.ejs	                            # template
    └── index.js                                # entry
  └── lib                                       # test website directory
    ├── board  
    └── line
      └── example                               # examples directory
        └── index.js                            # default example component
      └── index.js                              # component file
     ...
    └── index.js                                # output file
```
## <a name="usage"></a> Usage

1. All the components should inherit `src/lib/shape`
2. Implment `renderSelection()` to be used in `Board`
3. We may use the component following the following code.

```
	let board = new MomentumChart.Board('#app', {config}, [data]);          // create board
	board.'<component-name:lower>'();    // add component to svg node/ board
	board.line({config});                                     // other components
	board.render();                         // board.animate is in our plan
```

## <a name="testing"></a> Testing
* In the `<component-name>/tests/` directory, ensure that you add tests to cover all of the component code.
* Run the test and ensure that all tests are passing by running:
  * `yarn test` from the chart (momentum-ui/chart) directory

## <a name="rules"></a> Coding Guidelines

### ES6

We follow the es6 [Style Guide](http://es6-features.org/)

## License

By contributing your code to the `@momentum-ui/chart` GitHub repository, you agree to license your contribution under the MIT license.
