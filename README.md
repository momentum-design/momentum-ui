# @momentum-ui

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/main.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-blue.svg)](https://conventionalcommits.org)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/main/LICENSE)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

## **DEPRECATION NOTICE**

Packages which are deprecated and will no longer receive updates

* https://www.npmjs.com/package/@momentum-ui/tokens
* https://www.npmjs.com/package/@momentum-ui/icons
* https://www.npmjs.com/package/@momentum-ui/illustrations
* https://www.npmjs.com/package/@momentum-ui/animations

**Replacement packages which will be updated and are backwards compatible**

* [**@momentum-design/animations**](https://github.com/momentum-design/momentum-design/tree/main/packages/%40momentum-design/animations) - Animation assets. [NPMJS Package](https://www.npmjs.com/package/@momentum-design/animations)
* [**@momentum-design/icons**](https://github.com/momentum-design/momentum-design/tree/main/packages/%40momentum-design/icons) - Icon assets. [NPMJS Package](https://www.npmjs.com/package/@momentum-design/icons)
* [**@momentum-design/illustrations**](https://github.com/momentum-design/momentum-design/tree/main/packages/%40momentum-design/illustrations) - Illustration assets. [NPMJS Package](https://www.npmjs.com/package/@momentum-design/illustrations)

**New tokens are being generated and updated here and are a work in progress. New projects should consume the tokens at the link below. Existing projects can continue to use their existing tokens, but note the current repository tokens: ttps://www.npmjs.com/package/@momentum-ui/tokens will not be receiving updates.** 

* [**@momentum-design/tokens**](https://github.com/momentum-design/momentum-design/tree/main/packages/%40momentum-design/tokens) - Token assets. [NPMJS Package](https://www.npmjs.com/package/@momentum-design/tokens)


### Migration Guide 

* Icons - https://github.com/momentum-design/momentum-ui/blob/main/icons-rebrand/MIGRATION.MD
* Illustrations - https://github.com/momentum-design/momentum-ui/blob/main/illustrations/MIGRATION.MD
* Animations - https://github.com/momentum-design/momentum-ui/blob/main/animations/MIGRATION.MD
* Tokens - TODO
 

> Momentum UI

Momentum UI is a collection of UI libraries for implementing [Momentum Design](https://momentum.design) into web applications and websites.


## Table of Contents

- [Background](#background)
- [Usage](#usage)
- [Requirements](#requirements)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Background

These libraries allow web developers to quickly and easily create Momentum Design web apps and sites. We provide libraries built on HTML/CSS and many of the modern JavaScript frameworks, including [ReactJS](https://reactjs.org/), [Angular](https://angular.io/) and [AngularJS](https://angularjs.org/). We use a [Lerna](http://lernajs.io) monorepo to manage all of the libraries in one repository.

## Usage

The individual libraries are distributed through [npm](https://www.npmjs.com/search?q=momentum-ui). You can find information on usage and installation in each of their individual README files.
- [@momentum-ui/core](/core/README.md)
- [@momentum-ui/react](/react/README.md)
- [@momentum-ui/icons](/icons/README.md)

## Requirements

To contribute to @momentum-ui, you need to have [>=Node 8.10.0](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/) installed globally on your machine.

## Development

Setting up your development environment:

1. Clone this repo using a git client (e.g. `git clone https://github.com/momentum-design/momentum-ui.git`)
1. Run `yarn install` from the root of the repo.
1. Run `yarn bootstrap` from the root of the repo.
1. Run `yarn start:all` to start the playground app for all libraries or `yarn start:<library>` to only start the library the you are working in.

NOTE: Install watchman with `brew install watchman` if you are having the following or similar error after an initial `yarn start`:

``` bash
2017-09-05 00:44 node[68587] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
    2017-09-05 00:44 node[68587] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
    events.js:160
          throw er; // Unhandled 'error' event
          ^

    Error: Error watching file for changes: EMFILE
        at exports._errnoException (util.js:1022:11)
        at FSEvent.FSWatcher._handle.onchange (fs.js:1406:11)
```


## Contributing

PRs are welcome! See [CONTRIBUTING](CONTRIBUTING.md) for details.

## License

&copy;2013-2020 Cisco Systems, Inc. and/or its affiliates. All Rights Reserved.

See [LICENSE](LICENSE) for details.
