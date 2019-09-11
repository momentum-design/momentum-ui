# Axis

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/axis

Use axis to creat axis in board

# Instructor

## Example

```
let scaleX = new MomentumCharts.Scale('scaleLinear', {
	range: [200, 800],
	domain: [2000, 2020]
}).Scale;
var axis = board.axis('axisBottom', {
	generator: {
		scale: scaleX,
		ticks: 5,
		y: 350
	},
	dataConvert: function() {
		return {
			generator: {
				scale: scaleX2,
				ticks: 5,
				y: 350
			}
		};
	}
}, '');
```

### arguments

+ name - should be the following string.

  - x
  - y
  - axisRight
  - axisBottom
  - axisLeft
  - axisRight

+ config

+ url

	The axis only need config. So we pass the new config as data in the other components.

## Generator

'generator' in the Config defines how to create the shape with data. 

+ x * - x position. Accept number or function.
	
```
{
	generator: {
		x: function(data, index) {
			return index * 10;
		}
	}
}
```
	
+ y * - y position. Accept number or function.
	
```
{
	generator: {
		y: 100
	}
}
```


## Modify

Refer to the modify object in [Shape](../shape/README.md).

# Momentum Usage
