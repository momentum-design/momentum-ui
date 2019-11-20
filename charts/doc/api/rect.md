# Rect

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/rect

Use rect to creat bar chart in board

# Example

```
board.rect(dataUrl, config);
```

You can ignore the dataUrl, then board will use the root data as the data of rect

```
board.rect(config);
```

# Instructor

## arguments

+ dataUrl

	The rect component will accept an array as the data source. But the board instance only accept a string as the url path of its data.
	
```
var sourceData = {
	bar: [1, 2, 3],
	line: [4, 5, 6],
	teams: {
		bar: [0, 1, 2]
	}
};

board.rect('bar', config); // will use [1, 2, 3]
board.rect('line', config); // will use [4, 5, 6]
board.rect('teams/bar', config); // will use [0, 1, 2]
```

+ config

	You will be asked to pass modify and generator via config.
	
```
{
	generator: {
	
	},
	modify: {
		classed: {
			'md-chart-rect': true
		}
	}
}
```

## generator

'generator' in the Config defines how to create the shape with data. 

+ x *

	The x position of rect. Accept number or function.
	
```
{
	generator: {
		x: function(data, index) {
			return index * 10;
		}
	}
}
```
	
+ y *

	The y position of rect. Accept number or function.
	
```
{
	generator: {
		y: 100
	}
}
```
	
+ h *

	The h position of rect. Accept number or function.
	
```
{
	generator: {
		w: function(data, index) {
			return data.propName;
		}
	}
}
```

+ w *

	The w position of rect. Accept number or function.
	
+ rx

	An array to define the rx length of the border-raduis. [top-left, top-right, bottom-right, bottom-left].
	
```
{
	generator: {
		rx: [5]  // [5, 5, 5, 5]
	}
}
```

```
{
	generator: {
		rx: [5, 0]  // [5, 0, 5, 0]
	}
}
```

```
{
	generator: {
		rx: [5, 5, 5, 5]  // [5, 5, 5, 5]
	}
}
```

+ ry

	An array to define the ry length of the border-raduis. [top-left, top-right, bottom-right, bottom-left].


## modify

Refer to the modify object in [modify](../fundamentals/modify.md).
