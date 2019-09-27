# Momentum UI Charts

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/angular/LICENSE)

> @momentum-ui/charts

Momentum UI Charts is a UI framework for implementing Cisco Momentum Design into web apps and sites.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

Install and manage the Momentum UI Angular using NPM. You may use `yarn` or `npm`. By default, yarn/npm installs packages to node_modules/.

`npm install @momentum-ui/charts --save`

or

`yarn add @momentum-ui/charts`

## Usage


Then import the components into the components where you will use them.

``` js
import Board from '@momentum-ui/charts';
//or
import { Board } from '@momentum-ui/charts';

cosnt board = new Board('#Id', {condif}, , [data]);

board.line({
	generator: {
		// refer to d3.js 's generator sets
		x: function(d, i) {
			return 10 + i * 30;
		},
		y: 20
	},
	modify: {
		attr: {
			stroke: 'red',
			'stroke-width': 2
		}
	}
});

board.render();

board.transition({
	delay: 1000,
	duration: 3000
}, [newData]);

```

You can also ran `yarn build` to get complied files in `./bundles`, `./es` or `./lib`.
You need add [d3.js](https://d3js.org/d3.v5.js) if you use `<script>` tag to link the files under `./bundles`

Check `./src/lib/#componentName/example` to see more demos

## API

+ [Arc](src/lib/arc/README.md)
+ [Area](src/lib/area/README.md)
+ [Axis](src/lib/axis/README.md)
+ [Board](src/lib/board/README.md)
+ [Break](src/lib/break/README.md)
+ [Colors](src/lib/colors/README.md)
+ [Database](src/lib/database/README.md)
+ [Line](src/lib/line/README.md)
+ [Preload](src/lib/preload/README.md)
+ [Rect](src/lib/rect/README.md)
+ [Scale](src/lib/scale/README.md)
+ [Shape](src/lib/shape/README.md)
+ [Symbol](src/lib/symbol/README.md)
+ [Text](src/lib/text/README.md)

## Contribute

See [the contributing file](CONTRIBUTING.md)!

PRs accepted.

## License

[© 2014-2019 Cisco and/or its affiliates. All Rights Reserved.](../LICENSE)
