# Line

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/main.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/main/charts/LICENSE)

> @momentum-ui/charts/line

Use line to creat line chart in board

# Instructor

## Example

```
board.line(dataUrl, config);
```

You can ignore the dataUrl, then board will use the root data as the data of line

```
board.line(config);
```

### arguments

Refer to Shape.

+ dataUrl

+ config


## Generator

Generator defines how to create the shape with data.

+ x *

	The x position of line. Accept number or function.
	
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

	The y position of line. Accept number or function.
	
```
{
	generator: {
		y: 100
	}
}
```

+ defined

	If defined is specified, sets the defined accessor to the specified function or boolean and returns this line generator. 

+ curve

	If curve is specified, sets the curve factory and returns this line generator.

+ context

## Modify

Refer to the modify object in [Shape](../shape/README.md).

# Momentum Usage
