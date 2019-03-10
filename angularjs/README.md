# [Collab UI AngularJS](https://momentum.design/)

Collab UI AngularJS is a UI framework for implementing Cisco Collaboration Design into web apps and sites.

> @collabui/collab-ui-ng

Collab UI Angular is a UI framework for implementing Cisco Collaboration Design into web apps and sites.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

Install and manage the Collab UI Angular using NPM. You may use `yarn` or `npm`. By default, yarn/npm installs packages to node_modules/.

`npm install @collabui/collab-ui-ng --save`

or

`yarn add @collabui/collab-ui-ng`

## Usage

### NgModule
Import the @collabui/collab-ui-ng into your apps main module to make the components/directives available throughout your app.

``` ts
export default angular
  .module('app', [
    require('@collabui/collab-ui-ng').default,
  ])
  .component('app', new AppComponent())
  .name;

```

## Contribute

See [the contributing file](CONTRIBUTING.md)!

PRs accepted.

## License

[© 2014-2019 Cisco and/or its affiliates. All Rights Reserved.](../LICENSE)
