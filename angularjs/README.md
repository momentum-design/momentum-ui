# [Momentum UI AngularJS](https://momentum.design/)

Momentum UI AngularJS is a UI framework for implementing Cisco Momentum Design into web apps and sites.

> @momentum-ui/angularjs

Momentum UI Angular is a UI framework for implementing Cisco Momentum Design into web apps and sites.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

Install and manage the Momentum UI Angular using NPM. You may use `yarn` or `npm`. By default, yarn/npm installs packages to node_modules/.

`npm install @momentum-ui/angularjs --save`

or

`yarn add @momentum-ui/angularjs`

## Usage

### NgModule
Import the @momentum-ui/angularjs into your apps main module to make the components/directives available throughout your app.

``` ts
export default angular
  .module('app', [
    require('@momentum-ui/angularjs').default,
  ])
  .component('app', new AppComponent())
  .name;

```

## Contribute

See [the contributing file](CONTRIBUTING.md)!

PRs accepted.

## License

[© 2014-2019 Cisco and/or its affiliates. All Rights Reserved.](../LICENSE)
