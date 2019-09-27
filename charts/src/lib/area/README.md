# Area

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/area

Use area to creat area chart in board

# Instructor

## Example

```
board.area(dataUrl, config);
```

You can ignore the dataUrl, then board will use the root data as the data of area

```
board.area(config);
```

### arguments

+ dataUrl

	The area component will accept an array as the data source. But the board instance only accept a string as the url path of its data.
	
```
var sourceData = {
	bar: [1, 2, 3],
	line: [4, 5, 6],
	teams: {
		bar: [0, 1, 2]
	}
};

board.area('bar', config); // will use [1, 2, 3]
board.area('line', config); // will use [4, 5, 6]
board.area('teams/bar', config); // will use [0, 1, 2]
```

+ config

	You will be asked to pass modify and generator via config.
	
```
{
	generator: {
	
	},
	modify: {
    
	}
}
```

## Generator

Generator defines how to create the shape with data. We use D3's [area](https://github.com/d3/d3-shape/blob/v1.3.5/README.md#areas) generator here. You can pass the 

## Modify

Refer to the modify object in [Shape](../shape/README.md).

# Momentum Usage
