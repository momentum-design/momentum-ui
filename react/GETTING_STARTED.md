## Getting Started

It's fairly simple and easy. Just follow three simple steps as explained below:

### 1. Fork the repo

### 2. Clone the repo

Clone the `collab-ui-react` git repo:

```sh
git clone git@wwwin-github.cisco.com:collab-ui/collab-ui-react.git
```

### 3. Install all dependencies & devdependencies

From the command line navigate to 'collab-ui-react' directory created in previous step
and run following command:

```sh
yarn
```

### 4. Start Docs Site

From the command line run the code
as below:

```sh
yarn start
```

Behind the scene above command does all the heavy lifting which can be summarized as below:

* Building ES6/JSX source and output to `dist` folder
* Watching `src` folder to build on every changes
* Bundling docs application using webpack

There are npm scripts available for each of these individual task that alone can be run. Refer `package.json` for more details.

Now you can try editing source in src folder. With every changes in source saved, the demo app automagically updates without hitting F5 or browser reload button.
This setup provide a playground environment and also act as a demo of components showing their typical usage with various source examples.

### 5.  Build

To build the project for production, use following npm script:

```sh
yarn build
```

If everything goes fine, folders [`dist`, `bundles`, `lib`] will be created in root folder of this project. Folder `lib` will have minified ES6 modules with similar directory structure as source.
Generated minified ES6 files can be directly imported in ES6 application source code.

## Codebase Directory Structure

The React Toolkit codebase has following folder structure:

```sh
collab-ui-react
│  CHANGELOG.md
│  CONTRIBUTING.md
│  GETTING_STARTED.md
│  README.md
│  LICENSE
│  package.json
|  .babelrc
|  .editorconfig
|  .eslintignore
|  .eslintrc
|  .gitignore
│  .istanbul.yml
│  .npmignore
|  .npmrc
│  .watchmanconfig
|  ...
└───src
│  │
│  └───lib
│  |  └───Button
|  |  |  |  index.js
|  |  |  |  index.spec.js
|  |  |  |  __snapshots__
|  │  |  |  └───index.spec.js.snap
|  |  |  |  ...
│  |  └───Select
|  |  |  |  ...
|  |  |  index.js
│  └───docs
|  |  |  ...
│  └───helpers
└───tools
|  │  script.js
|  |  ...
└───config
|  |  webpack.config.dev.js
|  |  ...
```

### About directory structure

* All source goes inside `src` folder written using ES6/JSX standard.

* For every component there is a folder inside `src/lib`.

* Each component folder (say button) houses JSX source code and `__snapshots__` folder.

At the time of publishing only minimal files and folders are included in module to keep download / installation faster and save space on your disk. Post installation of colab-ui-react NPM
module it will have following directory structure:

```sh
collab-ui-react
│  README.md
│  LICENSE
│  package.json
|  index.js
|  ...
└───lib
|  └───Button
|  |  |  index.js
|  |  |  ...
|  └───Select
|  |  |  ...
|  |  ...
|
└───bundles
|  |  ...
└───dist
|  |  ...
```

As evident above, only assets (dist, bundles, lib) are part of published module.

## References & Links

[Contribution guidelines](/CONTRIBUTING.md)
