# Break

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/break

Use break to an overlay shape when you break the data.

# Instructor

## Example

```
let scaleY = MomentumChart.scale('scaleLinear', {
  domain: [0, 600, 3600, 4000],
  range: [380, 200, 150, 30]
}).Scale;
let breaks = board.break('break', {
  generator: {
    w: 800,
    h: scaleY(1000) - scaleY(3200),
    x: 50,
    y: scaleY(3200)
  }
});
```

### arguments

+ name - should be the following string.

+ config

## Generator

'generator' in the Config defines how to create the shape with data. 

+ x * - x position. Accept number or function.
	
+ y * - y position. Accept number or function.

+ h * - the height of the whole components.

+ w * - the width of the whole components.
	
```
{
	generator: {
		y: 100,
    x: 10,
    h: 300,
    w: 100
	}
}
```

+ direction - 'y' or 'x'. Along the Y/X axis

+ size - the size of each curve in the line

+ deep - the height of each curve  

## Modify

Refer to the modify object in [Shape](../shape/README.md).

# Momentum Usage
