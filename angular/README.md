# Collab UI Angular

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-ui/momentum-ui/master.svg)](https://circleci.com/gh/momentum-ui/momentum-ui/)
![npm (scoped)](https://img.shields.io/npm/v/@momentum-ui/angular.svg)
[![license](https://img.shields.io/github/license/momentum-ui/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/angular/LICENSE)

> @momentum-ui/angular

Collab UI Angular is a UI framework for implementing Cisco Collaboration Design into web apps and sites.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

Install and manage the Collab UI Angular using NPM. You may use `yarn` or `npm`. By default, yarn/npm installs packages to node_modules/.

`npm install @momentum-ui/angular --save`

or

`yarn add @momentum-ui/angular`

## Usage

### NgModule
Import the components that you would like to use in the NgModule and declare them in the "imports" using the `forRoot()` function.

``` ts
import BadgeModule from '@momentum-ui/angular/lib/badge';
// or
import { BadgeModule } from '@momentum-ui/angular';

@NgModule({
  imports: [
    BadgeModule.forRoot()
  ]
})
```

Then import the components into the components where you will use them.

``` ts
import BadgeComponent from '@momentum-ui/angular/lib/badge';
//or
import { BadgeComponent } from '@momentum-ui/angular';
```

## Contribute

See [the contributing file](CONTRIBUTING.md)!

PRs accepted.

## License

[© 2014-2019 Cisco and/or its affiliates. All Rights Reserved.](../LICENSE)
