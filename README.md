# @momentum-ui

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-ui/momentum-ui/master.svg)](https://circleci.com/gh/momentum-ui/momentum-ui/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-blue.svg)](https://conventionalcommits.org)
[![license](https://img.shields.io/github/license/momentum-ui/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/LICENSE)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)


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


## Contributing

PRs are welcome! See [CONTRIBUTING](CONTRIBUTING.md) for details.

## License

&copy;2013-2019 Cisco Systems, Inc. and/or its affiliates. All Rights Reserved.

See [LICENSE](LICENSE) for details.
