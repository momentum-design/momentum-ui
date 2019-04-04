# Collab UI Angular

[![CircleCI](https://img.shields.io/circleci/project/github/collab-ui/collab-ui/master.svg)](https://circleci.com/gh/collab-ui/collab-ui/)
![npm (scoped)](https://img.shields.io/npm/v/@collab-ui/angular.svg)
[![license](https://img.shields.io/github/license/collab-ui/collab-ui.svg?color=blueviolet)](https://github.com/collab-ui/collab-ui/blob/master/angular/LICENSE)

> @collab-ui/angular

Collab UI Angular is a UI framework for implementing Cisco Collaboration Design into web apps and sites.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

Install and manage the Collab UI Angular using NPM. You may use `yarn` or `npm`. By default, yarn/npm installs packages to node_modules/.

`npm install @collab-ui/angular --save`

or

`yarn add @collab-ui/angular`

## Usage

### NgModule
Import the components that you would like to use in the NgModule and declare them in the "imports" using the `forRoot()` function.

``` ts
import BadgeModule from '@collab-ui/angular/lib/badge';
// or
import { BadgeModule } from '@collab-ui/angular';

@NgModule({
  imports: [
    BadgeModule.forRoot()
  ]
})
```

Then import the components into the components where you will use them.

``` ts
import BadgeComponent from '@collab-ui/angular/lib/badge';
//or
import { BadgeComponent } from '@collab-ui/angular';
```

## Contribute

See [the contributing file](CONTRIBUTING.md)!

PRs accepted.

## License

[© 2014-2019 Cisco and/or its affiliates. All Rights Reserved.](../LICENSE)
