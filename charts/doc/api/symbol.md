# Symbol

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/symbol

Draw symbols to board

# Instructor

```
board.symbol({
  generator: {
    x: function(d, i) {
      return 10 + i * 30;
    },
    y: function(d) {
      return 300 - d.profit;
    },
    type: MomentumChart.Symbol.type('circle'),
    size: 40
  },
  modify: {
    attr: {
      stroke: 'white',
      fill: '#00a0d1',
      'stroke-width': 2
    }
  }
});
```

## arguments

+ data - the data of symbol.
+ config - You will be asked to pass modify and generator via config.

## generator

'generator' in the Config defines how to create the shape with data. 

+ x * - x position. Accept number or function.
+ y * - y position. Accept number or function.
+ size * - the size of each symbol
+ type * - could be the following vaules

	- symbolCircle
	- symbolCross
	- symbolDiamond
	- symbolSquare
	- symbolStar
	- symbolTriangle
	- symbolWye

## modify

Refer to the modify object in [modify](../fundamentals/modify.md).
